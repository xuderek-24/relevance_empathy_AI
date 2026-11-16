(() => {
  "use strict";

  // ---- Participant + session info ----------------------------------------
  // A participant ID can be passed in the link, e.g. .../?pid=P001
  // (PROLIFIC_PID and SONA "id" are also recognized). Otherwise one is generated.
  const params = new URLSearchParams(location.search);
  const participantId =
    params.get("pid") || params.get("PROLIFIC_PID") || params.get("id") ||
    "anon-" + Math.random().toString(36).slice(2, 10);
  const sessionStart = new Date().toISOString();

  // ---- Randomize order (Fisher–Yates), fresh for every participant ---------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  // Attention checks never appear in the first NO_CHECK_FIRST positions:
  // shuffle the regular items, take the first few as the opening, then shuffle
  // the remaining regular items together with the attention checks.
  const NO_CHECK_FIRST = 5;
  function buildOrder(items) {
    const regular = shuffle(items.filter((q) => !q.attentionCheck));
    const checks = items.filter((q) => q.attentionCheck);
    const opening = regular.slice(0, NO_CHECK_FIRST);
    return opening.concat(shuffle(regular.slice(NO_CHECK_FIRST).concat(checks)));
  }
  const order = buildOrder(QUESTIONS);

  // ---- DOM ----------------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const screens = { intro: $("intro"), question: $("question"), end: $("end"), done: $("done") };
  const show = (name) => {
    for (const [k, el] of Object.entries(screens)) el.hidden = k !== name;
    window.scrollTo(0, 0);
  };

  // Build the 7 radio buttons once.
  const optionsEl = $("scale-options");
  for (let v = 1; v <= 7; v++) {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="likert" value="${v}"><span>${v}</span>`;
    optionsEl.appendChild(label);
  }
  const radios = optionsEl.querySelectorAll("input");
  radios.forEach((r) => r.addEventListener("change", () => ($("next-btn").disabled = false)));

  // ---- Flow ---------------------------------------------------------------
  const responses = [];
  let idx = 0;
  let shownAt = 0;

  function renderQuestion() {
    const q = order[idx];
    $("q-text").textContent = q.text + ":";
    $("anchor-low").textContent = "1 = " + q.low;
    $("anchor-high").textContent = "7 = " + q.high;
    $("progress-text").textContent = `${idx + 1} of ${order.length}`;
    $("progress-bar").style.width = `${(idx / order.length) * 100}%`;
    radios.forEach((r) => (r.checked = false));
    $("next-btn").disabled = true;
    shownAt = performance.now();
  }

  $("start-btn").addEventListener("click", () => {
    show("question");
    renderQuestion();
  });

  $("next-btn").addEventListener("click", () => {
    const checked = optionsEl.querySelector("input:checked");
    if (!checked) return;
    const q = order[idx];
    const value = Number(checked.value);
    responses.push({
      participant_id: participantId,
      session_start: sessionStart,
      position: idx + 1,
      item_id: q.id,
      item_text: q.text,
      anchor_1: q.low,
      anchor_7: q.high,
      response: value,
      rt_ms: Math.round(performance.now() - shownAt),
      attention_check_expected: q.attentionCheck ?? "",
      attention_check_passed: q.attentionCheck ? value === q.attentionCheck : "",
    });
    idx++;
    if (idx < order.length) renderQuestion();
    else show("end");
  });

  // Responses are held in memory only; they are submitted once, when End is pressed.
  // A participant who closes the page before pressing End submits nothing.
  let submitted = false;
  $("end-btn").addEventListener("click", () => {
    if (submitted) return;
    submitted = true;
    $("end-btn").disabled = true;
    finish();
  });

  // ---- Saving -------------------------------------------------------------
  function toCSV(rows) {
    const cols = Object.keys(rows[0]);
    const esc = (v) => {
      const s = String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  }

  function download() {
    const blob = new Blob([toCSV(responses)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `responses_${participantId}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function finish() {
    const ended_at = new Date().toISOString();
    responses.forEach((r) => (r.ended_at = ended_at));
    show("done");
    $("download-btn").hidden = !CONFIG.SHOW_DOWNLOAD;
    $("download-btn").onclick = download;

    if (!CONFIG.DATAPIPE_EXPERIMENT_ID) {
      $("save-status").textContent = "Your responses have been recorded.";
      return redirect();
    }

    try {
      // DataPipe saves `data` as a file named `filename` (one file per participant).
      const filename = `${participantId}_${ended_at.replace(/[:.]/g, "-")}.csv`;
      const res = await fetch("https://pipe.jspsych.org/api/data/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify({
          experimentID: CONFIG.DATAPIPE_EXPERIMENT_ID,
          filename,
          data: toCSV(responses),
        }),
      });
      if (!res.ok) throw new Error(`DataPipe ${res.status}: ${await res.text()}`);
      $("save-status").textContent = "Your responses have been saved. You may close this page.";
      redirect();
    } catch (err) {
      console.error(err);
      $("save-status").textContent =
        "We couldn't upload your responses. Please download them below and send the file to the researcher.";
      $("download-btn").hidden = false;
    }
  }

  function redirect() {
    if (CONFIG.COMPLETION_REDIRECT) setTimeout(() => (location.href = CONFIG.COMPLETION_REDIRECT), 1500);
  }

  // Warn before leaving mid-survey or before pressing End.
  window.addEventListener("beforeunload", (e) => {
    if (!screens.question.hidden || !screens.end.hidden) { e.preventDefault(); e.returnValue = ""; }
  });
})();

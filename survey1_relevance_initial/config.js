// Survey settings. Edit these, commit, and push; GitHub Pages picks up the change.
const CONFIG = {
  // DataPipe experiment ID (pipe.jspsych.org). When the participant presses End,
  // their responses are sent to DataPipe and saved as one CSV file per participant.
  // Data collection must be switched on for this experiment in DataPipe.
  DATAPIPE_EXPERIMENT_ID: "WFZUdUG3Fn4F",

  // Show a "Download my responses" button on the final screen.
  // (It always appears if the upload fails, so no data is lost.)
  SHOW_DOWNLOAD: false,

  // Optional: send participants here after they finish (e.g. a Prolific/SONA
  // completion link). Leave empty to just show the thank-you screen.
  COMPLETION_REDIRECT: "",
};

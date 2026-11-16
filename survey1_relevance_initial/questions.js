// Survey items, transcribed from "exp2 relevance questions.docx".
// text  = the question (the part before the colon)
// low   = anchor for 1 (the word before the slash)
// high  = anchor for 7 (the word after the slash)
// The order here does not matter: items are shuffled for every participant.
const QUESTIONS = [
  { id: "rel_imp",   text: "It’s ____ for me to have healthier relationships", low: "important", high: "unimportant" },
  { id: "rel_rel",   text: "To me, learning to have healthier relationships is", low: "relevant", high: "irrelevant" },
  { id: "rel_mean",  text: "Further cultivating healthy relationships", low: "means nothing to me", high: "means a lot to me" },

  { id: "study_imp",  text: "It’s ____ for me to study more effectively", low: "important", high: "unimportant" },
  { id: "study_rel",  text: "To me, learning to study more effectively is", low: "relevant", high: "irrelevant" },
  { id: "study_mean", text: "Studying more effectively", low: "means nothing to me", high: "means a lot to me" },

  { id: "insec_imp",  text: "It’s ____ for me to deal with insecurity better", low: "important", high: "unimportant" },
  { id: "insec_rel",  text: "To me, learning to deal with insecurity is", low: "relevant", high: "irrelevant" },
  { id: "insec_mean", text: "Knowing more ways to deal with insecurity", low: "means nothing to me", high: "means a lot to me" },

  { id: "mind_imp",  text: "It’s ____ that I learn how to be more mindful", low: "important", high: "unimportant" },
  { id: "mind_rel",  text: "To me, practicing how to be more mindful is", low: "relevant", high: "irrelevant" },
  { id: "mind_mean", text: "Knowing how to be more mindful", low: "means nothing to me", high: "means a lot to me" },

  { id: "fit_imp",  text: "It’s ____ that I become more physically fit", low: "important", high: "unimportant" },
  { id: "fit_rel",  text: "To me, learning how to become more physically fit is", low: "relevant", high: "irrelevant" },
  { id: "fit_mean", text: "Becoming more physically fit", low: "means nothing to me", high: "means a lot to me" },

  { id: "dress_imp",  text: "It’s ____ that I am better at dressing well", low: "important", high: "unimportant" },
  { id: "dress_rel",  text: "To me, learning how to dress well is", low: "relevant", high: "irrelevant" },
  { id: "dress_mean", text: "Knowing how to dress better", low: "means nothing to me", high: "means a lot to me" },

  { id: "interview_imp",  text: "It’s ____ that I do better in interviews", low: "important", high: "unimportant" },
  { id: "interview_rel",  text: "To me, learning how to do better in interviews is", low: "relevant", high: "irrelevant" },
  { id: "interview_mean", text: "Knowing how to do well in interviews", low: "means nothing to me", high: "means a lot to me" },

  { id: "tech_imp",  text: "It’s ____ that I keep up with news about technology and digital innovations", low: "important", high: "unimportant" },
  { id: "tech_mean", text: "Keeping up with developments in technology and digital innovations", low: "means nothing to me", high: "means a lot to me" },
  { id: "tech_rel",  text: "To me, keeping up with news about technology and digital innovations is", low: "relevant", high: "irrelevant" },

  { id: "music_mean",  text: "Keeping up to date about music, concerts, or new artists", low: "means nothing to me", high: "means a lot to me" },
  { id: "music_imp",   text: "It’s ____ that I keep up to date about news regarding music, concerts, or new artists", low: "important", high: "unimportant" },
  { id: "movies_rel",  text: "To me, following content about movies, television shows, or celebrities is", low: "relevant", high: "irrelevant" },

  { id: "travel_imp",  text: "It’s ____ that I routinely discover new locations to visit", low: "important", high: "unimportant" },
  { id: "culture_rel", text: "To me, learning about new cultures is", low: "relevant", high: "irrelevant" },

  { id: "plan_imp",  text: "It’s ____ that I plan out my entire day’s schedule", low: "important", high: "unimportant" },
  { id: "plan_mean", text: "Planning out my entire day’s schedule", low: "means nothing to me", high: "means a lot to me" },

  { id: "skills_imp",  text: "It’s ____ that I learn new skills occasionally", low: "important", high: "unimportant" },
  { id: "skills_mean", text: "Learning new skills occasionally", low: "means nothing to me", high: "means a lot to me" },
  { id: "skills_rel",  text: "To me, learning new skills occasionally is", low: "relevant", high: "irrelevant" },

  { id: "book_mean", text: "Having a book to read when I am bored", low: "means nothing to me", high: "means a lot to me" },
  { id: "book_rel",  text: "To me, having a book to read when I am bored is", low: "relevant", high: "irrelevant" },
  { id: "book_imp",  text: "It’s ____ that I have a book to read when I am bored", low: "important", high: "unimportant" },

  { id: "creative_mean", text: "Participating in creative activities, such as photography, painting, or writing", low: "means nothing to me", high: "means a lot to me" },
  { id: "creative_imp",  text: "It’s ____ that I participate in creative activities, such as photography, painting, or writing", low: "important", high: "unimportant" },
  { id: "creative_rel",  text: "To me, participating in creative activities, such as photography, painting, or writing is", low: "relevant", high: "irrelevant" },

  { id: "group_mean", text: "Participating in regular group activities", low: "means nothing to me", high: "means a lot to me" },
  { id: "group_imp",  text: "It’s ____ that I regularly participate in group activities", low: "important", high: "unimportant" },
  { id: "group_rel",  text: "To me, being able to attend more group activities is", low: "relevant", high: "irrelevant" },

  { id: "outdoors_mean", text: "Spending more time outdoors", low: "means nothing to me", high: "means a lot to me" },
  { id: "outdoors_rel",  text: "To me, being able to spend more time outdoors is", low: "relevant", high: "irrelevant" },
  { id: "outdoors_imp",  text: "It’s ____ that I spend more time outdoors", low: "important", high: "unimportant" },

  // Attention checks (expected answer noted for scoring)
  { id: "attn_3", text: "I am going to respond to this question with three to show I am focused", low: "no", high: "yes", attentionCheck: 3 },
  { id: "attn_7", text: "I am going to respond to this question with seven to show I am not distracted", low: "no", high: "yes", attentionCheck: 7 },
  { id: "attn_5", text: "To me, it’s important that I respond with five to this question to show I am focused", low: "relevant", high: "irrelevant", attentionCheck: 5 },
  { id: "attn_1", text: "To me, it’s important that I respond with one to this question to show I am not distracted", low: "relevant", high: "irrelevant", attentionCheck: 1 },
];

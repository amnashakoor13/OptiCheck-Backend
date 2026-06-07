// ai.service.js
// For lab/demo we'll implement a stub function that mimics an AI response.
// Replace the logic here with a call to OpenAI or other LLM when you have API keys.

exports.generatePrescription = async (payload) => {
  // payload could be a Test document or custom visionData
  // We'll produce a short plain-language recommendation based on calculatedScore or rawResults.

  let distanceScore = (payload.calculatedScore && payload.calculatedScore.distance) || null;
  let nearScore = (payload.calculatedScore && payload.calculatedScore.near) || null;

  // If it's a Mongoose doc, convert to raw object
  if (payload.toObject) payload = payload.toObject();

  // naive rules:
  let text = 'Vision is normal.';
  if (distanceScore) {
    if (distanceScore === '20/20') text = 'Distance vision appears normal (20/20).';
    else if (distanceScore === '20/30') text = 'Slight reduction in distance vision (approx 20/30). Consider screening for mild correction.';
    else if (distanceScore === '20/40') text = 'Moderate reduction in distance vision (approx 20/40). Suggest optometrist visit.';
    else text = `Distance vision measured as ${distanceScore}. Consider professional eye exam.`;
  } else if (payload.rawResults) {
    // fallback: use ratio heuristic
    const total = (payload.rawResults || []).length || 0;
    const rec = (payload.rawResults || []).filter(r => r.recognized).length || 0;
    const ratio = total ? (rec/total) : 1;
    if (ratio >= 0.9) text = 'Vision looks normal.';
    else if (ratio >= 0.7) text = 'Slight reduction in vision.';
    else text = 'Significant reduction in vision detected. Seek professional evaluation.';
  }

  // Include a mocked meta
  const meta = { source: 'stub', generatedAt: new Date().toISOString() };

  return { text, meta };
};

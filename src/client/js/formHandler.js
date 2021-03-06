async function handleSubmit(event) {
  event.preventDefault();

  const formInput = document.getElementById("source-text").value;
  const formType = Main.checkText(formInput);
  if (formType == Main.formTypes.INV) {
    alert("The submitted text is invalid! Please submit a valid text or url!");
    // return false;  I Can do this without adding else statement, but i think it's better to keep it like this
  } else {
    const resp = await fetch("/eval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: formInput, type: formType }),
    });
    const data = await resp.json();
    document.getElementById("score").innerHTML = `Polarity: ${data.score}`;
    document.getElementById(
      "agreement"
    ).innerHTML = `Agreement: ${data.agreement}`;
    document.getElementById(
      "subjectivity"
    ).innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
    document.getElementById(
      "confidence"
    ).innerHTML = `Confidence: ${data.confidence}`;
  }
}

export { handleSubmit };

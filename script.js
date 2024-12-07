const options = [
  { id: "option1", text: "JavaScript", votes: 0 },
  { id: "option2", text: "Python", votes: 0 },
  { id: "option3", text: "Java", votes: 0 },
  { id: "option4", text: "C++", votes: 0 },
];

function submitVote() {
  const selectedOption = document.querySelector('input[name="poll"]:checked');

  // Jika tidak ada pilihan yang dipilih, tampilkan SweetAlert
  if (!selectedOption) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select an option before submitting your vote!",
    });
    return;
  }

  const optionId = selectedOption.value;
  const selectedOptionObj = options.find((option) => option.id === optionId);

  if (selectedOptionObj) {
    selectedOptionObj.votes++;
    console.log(selectedOptionObj);
    displayResult();

    // Tampilkan SweetAlert sukses setelah vote ditambahkan
    let joke = "";
    switch (selectedOptionObj.text) {
      case "JavaScript":
        joke =
          "Programming: Where 90% of the time is spent fixing the bugs you wrote yesterday.";
        break;
      case "Python":
        joke = "Code: It works until you look at it too closely.";
        break;
      case "Java":
        joke =
          "Debugging: Where you spend an hour fixing one line of code and then realize you forgot to save the file.";
        break;
      case "C++":
        joke =
          "Programming languages: Like relationships, they start easy and then you find out how complicated they really are.";
        break;
      default:
        joke =
          "Programming: Where 90% of the time is spent fixing the bugs you wrote yesterday.";
    }

    Swal.fire({
      icon: "success",
      title: "Vote Submitted!",
      text: `You voted for ${selectedOptionObj.text}. ${joke}`,
    });
  }
}

function displayResult() {
  const result = document.getElementById("result");
  result.innerHTML = "";

  options.forEach((option) => {
    const percentage = ((option.votes / getTotalVotes()) * 100).toFixed(2) || 0;
    const barWidth = percentage > 0 ? percentage + "%" : "0%";

    const optionResult = document.createElement("div");
    optionResult.className = "option-result";
    optionResult.innerHTML = `
          <span class="option-text">${option.text}</span>
          <div class="bar-container">
            <div class="bar" style="width: ${barWidth};"></div>
          </div>
          <span class="percentage">${percentage}%</span>
        `;

    result.appendChild(optionResult);
  });
}

function getTotalVotes() {
  return options.reduce((total, option) => total + option.votes, 0);
}

displayResult();

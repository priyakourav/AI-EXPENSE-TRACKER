let expenses = [];

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;

  let category = predictCategory(desc);

  let expense = { desc, amount, category };
  expenses.push(expense);

  displayExpenses();
}

function predictCategory(text) {
  text = text.toLowerCase();

  if (text.includes("pizza") || text.includes("food"))
    return "Food";
  if (text.includes("uber") || text.includes("bus"))
    return "Travel";
  if (text.includes("movie"))
    return "Entertainment";

  return "Other";
}

function displayExpenses() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  expenses.forEach(exp => {
    let li = document.createElement("li");
    li.innerText = `${exp.desc} - ₹${exp.amount} (${exp.category})`;
    list.appendChild(li);
  });
}

function showChart() {
  let data = {};

  expenses.forEach(exp => {
    data[exp.category] = (data[exp.category] || 0) + Number(exp.amount);
  });

  new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

function showInsights() {
  let total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  if (total > 5000) {
    alert("⚠️ You are spending too much!");
  }
}
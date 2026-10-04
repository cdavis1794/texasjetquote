(function () {
  "use strict";
  var fields = document.querySelectorAll("[data-brief-field]");
  var output = document.getElementById("charter-brief-output");
  var copy = document.querySelector("[data-copy-charter-brief]");
  var status = document.querySelector("[data-brief-status]");
  if (!output || !fields.length || !copy || !status) return;

  var checklist = output.value.slice(output.value.indexOf("\n\nBEFORE ACCEPTING"));
  var labels = {
    shape: "Trip structure", passengers: "Passengers",
    departure: "Departure date and local time window",
    origin: "Austin starting point and airport preference",
    destination: "Dallas final destination district",
    deadline: "Meeting / must-arrive deadline and chosen buffer",
    airport: "Arrival airport preference", return: "Return / onward leg",
    needs: "Bags, cabin needs and flexibility"
  };
  function update() {
    var lines = ["AUSTIN–DALLAS CHARTER REQUEST"];
    fields.forEach(function (field) {
      var value = field.value.trim();
      if (field.type === "number" && !field.validity.valid) value = "[confirm valid passenger count]";
      lines.push(labels[field.getAttribute("data-brief-field")] + ": " + (value || "[confirm]"));
    });
    output.value = lines.join("\n") + checklist;
    status.textContent = "";
  }
  fields.forEach(function (field) {
    field.addEventListener("input", update);
    field.addEventListener("change", update);
  });
  copy.hidden = false;
  update();
  copy.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent = "Copied. Paste the brief into your own notes or provider request.";
    } catch (error) {
      output.focus();
      output.select();
      status.textContent = "Use your browser’s Copy command to copy the selected brief.";
    }
  });
})();

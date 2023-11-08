// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {
  function updateHourClasses() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var hour = parseInt($(this).attr("id").split("-")[1]);
      var timeBlock = $(this);

      if (hour < currentHour) {
        timeBlock.removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        timeBlock.removeClass("past future").addClass("present");
      } else {
        timeBlock.removeClass("past present").addClass("future");
      }
    });
  }

  // Function to generate time blocks from 9AM to 5PM
  function generateTimeBlocks() {
    var container = $(".container-fluid");
    for (var i = 9; i <= 17; i++) {
      var formattedHour = dayjs().hour(i).format("hA");
      var timeBlock = $(`<div id="hour-${i}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${formattedHour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`);
      container.append(timeBlock);
    }
  }

  // Call the function to generate time blocks
  generateTimeBlocks();

  // Call the function initially to set up the classes
  updateHourClasses();

  // Call the function every minute to update classes in real-time
  setInterval(updateHourClasses, 60000);

  // Add click event listener for save button
  $(".saveBtn").on("click", function() {
    var description = $(this).siblings(".description").val();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, description);
  });

  // Retrieve saved data from localStorage and populate textareas
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription) {
      $(this).find(".description").val(savedDescription);
    }
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});

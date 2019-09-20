// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: $("[burger_name]:checked").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("Manifested a Masterpiece!");
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(".eat-burger").on("click", function (event) {
        event.preventDefault();


        let id = $(this).data("id");
        let devouredState = {
            devouored: 1
        };

        // Send the PUT request.
        $.ajax("/api/burgers/ + id", {
            type: "PUT",
            data: devouredState
        }).then(function () {
            console.log("Burger destroyed");
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(".trash-burger").on("click", function (event) {

        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("Burger destroyed");
            // Reload the page to get the updated list
            location.reload();
        });
    });
});
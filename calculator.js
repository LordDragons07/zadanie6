"use strict";

window.addEventListener("DOMContentLoaded", function () {

    var quantityField = document.getElementById("quantity");
    var typeRadios = document.querySelectorAll("input[name='service-type']");
    var optionWrapper = document.getElementById("option-wrapper");
    var optionSelect = document.getElementById("option");
    var propertyWrapper = document.getElementById("property-wrapper");
    var propertyCheckbox = document.getElementById("property");
    var result = document.getElementById("result");

    var serviceData = {
        "1": { name: "Базовая уборка", price: 1000, hasOptions: false, hasProperty: false },
        "2": { name: "Генеральная уборка", price: 2000, hasOptions: true, hasProperty: false },
        "3": { name: "Уборка после ремонта", price: 3000, hasOptions: false, hasProperty: true, propertyPrice: 1500 }
    };

    function getSelectedType() {
        var i;
        for (i = 0; i < typeRadios.length; i += 1) {
            if (typeRadios[i].checked) {
                return typeRadios[i].value;
            }
        }
        return "1";
    }

    function getQuantity() {
        var quantity = parseInt(quantityField.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }
        return quantity;
    }

    function updateVisibility(service) {
        optionWrapper.hidden = !service.hasOptions;
        propertyWrapper.hidden = !service.hasProperty;
    }

    function calculatePrice() {
        var typeValue = getSelectedType();
        var service = serviceData[typeValue];
        var quantity = getQuantity();
        var total = service.price;
        var selectedOption;

        updateVisibility(service);

        if (service.hasOptions) {
            selectedOption = optionSelect.options[optionSelect.selectedIndex];
            total += parseInt(selectedOption.getAttribute("data-price"), 10);
        }

        if (service.hasProperty && propertyCheckbox.checked) {
            total += service.propertyPrice;
        }

        total *= quantity;

        result.textContent = "Итоговая стоимость: " + total + " руб.";
    }

    quantityField.addEventListener("input", calculatePrice);
    optionSelect.addEventListener("change", calculatePrice);
    propertyCheckbox.addEventListener("change", calculatePrice);

    typeRadios.forEach(function (radio) {
        radio.addEventListener("change", calculatePrice);
    });

    calculatePrice();

});

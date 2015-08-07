function getVals() {
    var parent = this.parentNode,
        slides = parent.getElementsByTagName("input"),
        slide1 = parseInt(slides[0].value),
        slide2 = parseInt(slides[1].value),
        displayElement = parent.getElementsByClassName("rangeValues")[0];
    if (slide1 > slide2) {
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }
    displayElement.innerHTML = slide1 + " - " + slide2;
    calculate();
}

function calculate() {
    var sliderSections = document.getElementsByClassName("range-slider"),
        population = document.getElementById("population").value,
        x, y, sliders, low, high, tmp, p = 1;
    for (x = 0; x < sliderSections.length; x++) {
        sliders = sliderSections[x].getElementsByTagName("input");
        low = parseInt(sliders[0].value) - 5;
        high = parseInt(sliders[1].value) - 5;
        if (low > high) {
            tmp = high;
            high = low;
            low = tmp;
        }
        p *= normalcdf(high) - normalcdf(low);
    }
    document.getElementById("results-total").innerHTML = Math.round(population * p);
}

// http://www.math.ucla.edu/~tom/distributions/normal.html
function normalcdf(x) {   //HASTINGS.  MAX ERROR = .000001
	var t = 1 / (1 + 0.2316419 * Math.abs(x)),
	    d = 0.3989423 * Math.exp(-x * x / 2),
	    p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
	if (x > 0) {
		p = 1 - p;
	}
	return p;
}

window.onload = function(){
    var sliderSections = document.getElementsByClassName("range-slider"),
        x, y, sliders;
    for (x = 0; x < sliderSections.length; x++) {
        sliders = sliderSections[x].getElementsByTagName("input");
        for (y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                sliders[y].oninput();
            }
        }
    }
};

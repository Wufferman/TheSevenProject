function grafTempFire(data) {
  // FUNKTION DER TEGNER Temperatur Mod Brandte områder
  //   console.log(data);
  let startWidth = d3
      .select("#dataWindowGraf1")
      .node()
      .getBoundingClientRect().width,
    startHeight = d3
      .select("#dataWindowGraf1")
      .node()
      .getBoundingClientRect().height;
  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 30, bottom: 30, left: 90 },
    width = startWidth - margin.left - margin.right,
    height = startHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#dataWindowGraf1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("svg").attr("id", "colorExplainerGrafTemp");

  //Read the data
  let graphBottomHeight = height * 0.929;
  // When reading the csv, I must format variables:

  // Add X axis --> it is a date format
  var x = d3
    .scaleLinear()
    .domain(
      d3.extent(data, function (d) {
        return d.fireyear;
      })
    )
    .range([0, width])
    .nice(); // NICE TILFØJER LIDT MARGIN PÅ SIDERNE AF GRAFEN
  svg
    .append("g")
    .attr("transform", "translate(0," + graphBottomHeight + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(5));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +Number(d.fire);
      }),
    ])
    .range([graphBottomHeight, 100]);
  svg.append("g").attr("id", "yAxisGrafTemp").call(d3.axisLeft(y).ticks(5));

  // Second Y axis
  var y1 = d3
    .scaleLinear()
    .domain([
      d3.min(data, function (d) {
        if (d.avg > 0) return 0;
        return +Number(d.avg);
      }),
      d3.max(data, function (d) {
        return +Number(d.avg);
      }),
    ])
    .range([graphBottomHeight, 100]);
  svg
    .append("g")
    .attr("transform", "translate(" + width + ",0)")
    .attr("id", "y1AxisGrafTemp")
    .call(d3.axisRight(y1).ticks(4));
  // Add the line

  svg
    .append("path")
    .datum(data)
    .attr("id", "path1GrafTemp")
    .attr("fill", "none")
    .attr("stroke", "#a0a1a4")
    .attr("stroke-width", 4)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.fireyear);
        })
        .y(function (d) {
          return y1(Number(d.avg));
        })
    )
    .on("mouseover", function (e, d) {
      d3.select("#path2GrafTemp")
        .transition()
        .duration("50")
        .style("opacity", "0.25");
    })
    .on("mouseout", function (e, d) {
      d3.select("#path2GrafTemp")
        .transition()
        .duration("500")
        .style("opacity", "1");
    });
  svg
    .append("path")
    .datum(data)
    .attr("id", "path2GrafTemp")
    .attr("fill", "none")
    .attr("stroke", "#df2c14")
    .attr("stroke-width", 4)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.fireyear);
        })
        .y(function (d) {
          return y(Number(d.fire));
        })
    )
    .on("mouseover", function (e, d) {
      d3.select("#path1GrafTemp")
        .transition()
        .duration("50")
        .style("opacity", "0.25");
    })
    .on("mouseout", function (e, d) {
      d3.select("#path1GrafTemp")
        .transition()
        .duration("500")
        .style("opacity", "1");
    });
  // create svg element:
  var svg = d3.select("#colorExplainerGrafTemp");

  // Add the path using this helper function
  svg
    .append("rect")
    .attr("x", 10)
    .attr("y", 0)
    .attr("id", "califiresExplainerBox1boxGrafTemp")
    .attr("stroke", "black")
    .attr("fill", "#df2c14") // Box 1
    .on("mouseover", function (e, d) {
      d3.select("#path1GrafTemp")
        .transition()
        .duration("50")
        .style("opacity", "0.25");
    })
    .on("mouseout", function (e, d) {
      d3.select("#path1").transition().duration("500").style("opacity", "1");
    });
  svg
    .append("text")
    .html("Ingen data for valgte land ")
    .attr("x", 35)
    .attr("y", 15)
    .attr("id", "califiresExplainerBox1textGrafTemp")
    .data(data)
    .html(function (d) {
      if (d.countryname) return "Brændt område i " + d.countryname + " (km²)";
      if (d.countrygroupname)
        return "Brændt område i " + d.countrygroupname + " (km²)";
      return "Ingen data for valgte land ";
    })
    .on("mouseover", function (e, d) {
      d3.select("#path1GrafTemp")
        .transition()
        .duration("50")
        .style("opacity", "0.25");
    })
    .on("mouseout", function (e, d) {
      d3.select("#path1GrafTemp")
        .transition()
        .duration("500")
        .style("opacity", "1");
    }); // Box 1 tekst

  svg
    .append("rect")
    .attr("x", 10)
    .attr("y", 40)
    .attr("stroke", "black")
    .attr("id", "califiresExplainerBox2boxGrafTemp")
    .attr("fill", "#a0a1a4") // Box 2
    .on("mouseover", function (e, d) {
      d3.select("#path2GrafTemp")
        .transition()
        .duration("50")
        .style("opacity", "0.25");
    })
    .on("mouseout", function (e, d) {
      d3.select("#path2GrafTemp")
        .transition()
        .duration("500")
        .style("opacity", "1");
    });
  svg
    .append("text")
    .attr("x", 35)
    .attr("y", 55)
    .attr("id", "califiresExplainerBox2textGrafTemp")
    .text("Temperaturstigninger") // Box 2 text
    .on("mouseover", function (e, d) {
      d3.select("#path2GrafTemp")
        .transition()
        .duration("50")
        .style("opacity", "0.25");
    })
    .on("mouseout", function (e, d) {
      d3.select("#path2GrafTemp")
        .transition()
        .duration("500")
        .style("opacity", "1");
    });
}

function grafTypeFires(data) {
  //FUNKTION DER TEGNER TYPEBRANDE
  //   console.log(data);
  let startWidth = d3
      .select("#dataWindowGraf2")
      .node()
      .getBoundingClientRect().width,
    startHeight = d3
      .select("#dataWindowGraf2")
      .node()
      .getBoundingClientRect().height;
  const w = startWidth;
  const h = startHeight;
  const barPadding = w * 0.05; // Bruges til at lave afstand imellem søjler

  let gemtdata = data.sort((a, b) => a.fire - b.fire);

  // scale her
  const xScale = d3
    .scaleLinear()
    .domain([0, gemtdata.length])
    .range([0, w * 0.7])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(gemtdata, function (d) {
        return +Number(d.fire);
      }),
    ])
    .range([20, h - 120]);

  const svg = d3
    .select("#dataWindowGraf2")
    .append("svg")
    .attr("width", w)
    .attr("height", h + 40);

  let toop = d3
    .select("#toop")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Lave barchart (søjlediagram)
  svg
    .selectAll("rect")
    .data(gemtdata)
    .enter()
    .append("rect")
    // 'd' er datapunktet
    // 'i' er index i datasættet
    .attr("x", function (d, i) {
      // Søjlerne spredes jævnt ud over 'w'
      return xScale(i) + barPadding;
    })
    .attr("y", function (d) {
      // 'y' er position for søjlens øverste kant
      // Husk, y-aksen vender på hovedet!
      return h - yScale(d.fire);
    })
    // Bredden er fast - og afhænger af 'w' og antallet af datapunkter
    .attr("width", xScale(gemtdata.length) / 10) // Padding skaber luft imellem søjler
    // Højden er datapunktet * 4.
    .attr("height", function (d) {
      return yScale(d.fire) - 20;
    })
    // Alle søjler er farvet 'teal'
    .attr("fill", "#df2c14")

    // tester mousetool af her

    .on("mouseover", function (e, d) {
      toop.style("visibility", "visible");
      var xPosition = parseFloat(d3.select(this).attr("x")) + xScale(1) / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

      d3.select(this).on("mouseout", function (d) {
        d3.select(this).attr("fill", "#df2c14");
      });
    })
    .on("mousemove", function (e, d) {
      d3.select("#toop")
        .html(
          "Brandtype: " +
            d.itemname +
            "<br>Brændt område: " + //Herunder er der sat punktum i hver tusind nummeringer
            d3.format(",")(d.fire.toFixed(0)).replaceAll(",", ".")
        )
        .style("left", window.event.clientX + 25 + "px")
        .style("top", window.event.clientY - 25 + "px");
      // console.log(e.clientX + " " + e.clientY);
    })
    .on("mouseleave", function () {
      // console.log("mouseout");
      toop.style("visibility", "hidden");
    });

  // svg
  //   .selectAll("g")
  //   .data(gemtdata)
  //   .enter()
  //   .append("g")
  //   .classed("cNames", true)
  //   .append("text")
  //   .attr("x", function (d, i) {
  //     return xScale(i);
  //   })
  //   .attr("y", function (d) {
  //     return h;
  //   })
  //   .text(function (d) {
  //     return d.itemname;
  //     // her
  //   })
  //   .attr("text-anchor", "start")
  //   .attr("id", "xAxisTypeGraf");
  svg
    .append("g")
    .attr("class", "cNames")
    .attr("transform", "translate(0," + (h * (h - 20)) / h + ")")
    .call(
      d3.axisBottom(xScale).tickFormat(function (d, i) {
        try {
          return gemtdata[i - 1].itemname;
        } catch {
          return;
        }
      })
    )
    .selectAll("text")
    .style("text-anchor", "start")
    .attr("dx", "-.8em")
    .attr("dy", ".70em")
    .attr("transform", "rotate(25)");

  svg.select(".cNames path.domain").attr("d", function () {
    return "M0,0.5V0.5H" + w * 0.75;
  });

  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(gemtdata, function (d) {
        return +Number(d.fire);
      }),
    ])
    .range([h - 20, 120]);
  svg
    .append("g")
    .attr("id", "yAxisFireType")
    .attr("transform", "translate(" + w * 0.75 + ",0)")
    .call(d3.axisRight(y).ticks(6));
}

function firstGrafReturnContinents(val) {
  d3.json("/api/fireyear", {
    method: "POST", // POST metoden bruges til at sende data til serveren
    body: JSON.stringify({
      countrygroupname: val,
      iso2code: "nej",
    }),
  }).then(function (response) {
    // KODE HER
    grafTempFire(response.data);
  });
}
function firstGrafReturnCountry(val) {
  d3.json("/api/fireyear", {
    method: "POST", // POST metoden bruges til at sende data til serveren
    body: JSON.stringify({
      countrygroupname: "nej",
      iso2code: val,
    }),
  }).then(function (response) {
    // KODE HER
    grafTempFire(response.data);
  });
}
function secondGrafReturnContinents(val) {
  d3.json("/api/firetype", {
    method: "POST", // POST metoden bruges til at sende data til serveren
    body: JSON.stringify({
      countrygroupname: val,
      iso2code: "nej",
    }),
  }).then(function (response) {
    // KODE HER
    grafTypeFires(response.data);
  });
}
function secondGrafReturnCountry(val) {
  // console.log("Graf2: " + val);
  d3.json("/api/firetype", {
    method: "POST", // POST metoden bruges til at sende data til serveren
    body: JSON.stringify({
      countrygroupname: "nej",
      iso2code: val,
    }),
  }).then(function (response) {
    // KODE HER
    grafTypeFires(response.data);
  });
}

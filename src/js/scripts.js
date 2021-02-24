$(document).ready(function () {
  let $folio = $("#portfolio-body");
  // static stocks that the brand wants to track.
  // This must be constant to prevent righting over the array memory
  const $symbol = [
    "AWI",
    "AZEK",
    "BCC",
    "BECN",
    "BLDR",
    "BXC",
    "CENT",
    "DE",
    "DOOR",
    "EXP",
    "FAST",
    "HBP",
    "HD",
    "JELD",
    "LL",
    "LOW",
    "LPX",
    "MAS",
    "PPG",
    "SHW",
    "SMG",
    "SSD",
    "SWK",
    "TREX",
    "TSCO",
    "TTC",
    "UFPI",
    "WDFC",
    "WFG",
    "WY",
  ];
  let $chg;
  let $percent;
  let $ticker;

  // for loop to iterate through the array
  for (let m = 0; m < $symbol.length; m++) {
    $ticker = $symbol[m];

    let $link =
      "https://finnhub.io/api/v1/quote?symbol=" +
      $ticker +
      "&token=c0o46fn48v6qah6rujs0";
    // Ajax request to get data
    $.ajax({
      type: "GET",
      url: $link,
      success: function (stocks) {
        function change(a, b) {
          // calculating the price difference; taking closing price subtracting opening price
          $chg = b - a;
          // we want to make sure price change is over zero to start
          // if true then return string with price change fixed to 2 decimal places with a green color code
          // if false then return string with price change fixed to 2 decimal places with a red color code
          if ($chg > 0) {
            return '<p class="pricey-stock">' + $chg.toFixed(2) + "</p>";
          } else if ($chg < 0) {
            return '<p class="cheap-stock">' + $chg.toFixed(2) + "</p>";
          } else {
            return '<p class="neutral-stock">' + $chg.toFixed(2) + "</p>";
          }
        }
        // calculate percentage increase using current price and last closing price
        function percIncrease(a, b) {
          if (b !== 0) {
            if (a !== 0) {
              $percent = ((b - a) / a) * 100;
            } else {
              $percent = b * 100;
            }
          } else {
            $percent = -a * 100;
          }
          // used conditional operator to test if percentage variable is greater than 0
          // if true return string with percentage, in green with a arrow pointing up
          // if false return string with percentage, in red with a arrow pointing down
          return $percent > 0
            ? '<p class="pricey-stock">' +
                $percent.toFixed(2) +
                '<span class="portfolio-changePositive"></span></p>'
            : '<p class="cheap-stock">' +
                $percent.toFixed(2) +
                '<span class="portfolio-changeNegative"></span></p>';
        }
        // append the symbol, stock price, price change and percentage change to table
        $folio.append(
          '<tr valign="middle"><td><p  class="BasicTable-symbol">' +
            $symbol[m] +
            '</p></td><td><p class="neutral-stock">&#36;' +
            stocks.c.toFixed(2) +
            "</p></td><td>" +
            change(stocks.pc, stocks.c) +
            '</td><td><p class="neutral-stock">' +
            percIncrease(stocks.pc, stocks.c) +
            "</p></td></tr>"
        );
      },
      // error coding incase there's a bug that prevents the AJAX call
      error: function () {
        alert("error loading stocks");
      },
    });
  }
});

// sort table which the user can call by clicking the "name" column
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("portfolio-body");
  switching = true;
  /* Make a loop that will continue until
no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
  first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
    one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
    and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

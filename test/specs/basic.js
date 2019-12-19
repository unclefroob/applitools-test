const assert = require("assert");

describe("automate customer journey on ebay web page", () => {
  it("browse to ebay web page and check the page is right", () => {
    browser.url("https://www.ebay.com.au/");
    const title = browser.getTitle();
  });

  it("search for keyword", () => {
    //click on search box, type in keyword, click on search button
    $("#gh-ac-box").click();
    browser.keys("iPhone");
    $("#gh-btn").click();
  });

  it("check if valid results", () => {
    let noResult = false;
    //srp-river-results-message1 is an id used when search is altered by suggestion so check if altered or 0 results
    if (
      $("#srp-river-results-message1").isExisting() ||
      $(".srp-controls__count-heading span").getText() === "0"
    ) {
      noResult = true;
    }

    assert.strictEqual(noResult, false);
  });
});

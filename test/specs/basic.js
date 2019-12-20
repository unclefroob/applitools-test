const expect = require("chai").expect;

describe("automate customer journey on ebay web page", () => {
  it("browse to ebay web page", () => {
    browser.url("https://www.ebay.com.au/");
    //check title string contails 'eBay'
    const title = browser.getTitle();
    expect(title)
      .to.be.a("string")
      .that.includes("eBay");
  });

  it("search for keyword", () => {
    //click on search box, type in keyword, click on search button
    $("#gh-ac-box").click();
    browser.keys("iPhone");
    $("#gh-btn").click();

    expect(
      $("#srp-river-results-message1").isExisting() ||
        $(".srp-controls__count-heading span").getText() === "0"
    ).eq(false);
  });
});

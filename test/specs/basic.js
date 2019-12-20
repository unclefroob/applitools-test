const expect = require("chai").expect;

describe("automate customer journey on ebay web page", () => {
  it("browse to ebay web page", () => {
    //defaulting to AU site
    browser.url("https://www.ebay.com.au/");

    //check title string contains 'eBay'
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

    //check results exist - srp-river-results-message1 ID only appears when suggested search happened instead
    expect(
      $("#srp-river-results-message1").isExisting() ||
        $(".srp-controls__count-heading span").getText() === "0"
    ).eq(false);
  });

  it("select item in results", () => {
    //get name of item before clicking
    const itemTitle = $("#srp-river-results ul li .s-item__title").getText();
    $("#srp-river-results ul li .s-item__title").click();

    //check new page title is name of item
    const pageTitle = browser.getTitle();
    expect(pageTitle).includes(itemTitle);
  });
});

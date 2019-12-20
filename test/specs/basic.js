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

    const headingCounterCheck = $(
      ".srp-controls__count-heading span"
    ).isExisting()
      ? $(".srp-controls__count-heading span").getText() === "0"
      : false;
    //check results exist - srp-river-results-message1 ID only appears when suggested search happened instead
    expect(
      $("#srp-river-results-message1").isExisting() || headingCounterCheck
    ).eq(false);
  });

  it("select item in results", () => {
    //get url of item before clicking
    const itemUrl = $("#srp-river-results ul li .s-item__link").getAttribute(
      "href"
    );
    $("#srp-river-results ul li .s-item__title").click();

    //check navigated to correct url
    const pageUrl = browser.getUrl();
    expect(pageUrl).includes(itemUrl);
  });

  it("select options", () => {
    const element = "#msku-sel-";
    for (i = 1; $(`${element}${i}`).isExisting(); i++) {
      $(`${element}${i}`).selectByIndex(1);
    }
  });
});

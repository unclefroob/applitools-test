const expect = require("chai").expect;

//generate random numbers to offset button and pause time
const rng = () => Math.round(Math.random() * 10);
const rngTime = () => Math.round(Math.random() * 10000);

describe("automate customer journey on ebay web page", () => {
  it("browse to ebay web page", () => {
    //create some history in the browser
    browser.url("http://www.google.com");
    browser.url("http://www.trademe.co.nz");
    browser.url("http://www.facebook.com");
    browser.url("https://www.ebay.com/nz");

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
    browser.pause(rngTime());
    $("#gh-btn").click({ x: rng(), y: rng() });

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
    $("#srp-river-results ul li .s-item__title").click({ x: rng(), y: rng() });

    //check navigated to correct url
    const pageUrl = browser.getUrl();
    expect(pageUrl).includes(itemUrl);
  });

  it("select options and proceed to checkout", () => {
    const element = "#msku-sel-";
    browser.pause(rngTime());

    for (i = 1; $(`${element}${i}`).isExisting(); i++) {
      $(`${element}${i}`).selectByIndex(1);
      browser.pause(rngTime());
    }
    browser.pause(rngTime());
    $("#binBtn_btn").click({ x: rng(), y: rng() });
    const modalStyle = $("#vi_oly_streamLineBinOly").getAttribute("style");
    expect(modalStyle).includes("block");
    browser.debug();
  });

  //   it("check out as guest", () => {
  //     browser.pause(rngTime());
  //     $("#sbin-gxo-btn").click({ x: rng(), y: rng() });
  //     browser.waitUntil(
  //       () => browser.getTitle() !== "",
  //       5000,
  //       "checkout failed to load"
  //     );
  //     const title = browser.getTitle();
  //     expect(title).includes('Checkout');
  //     browser.debug();
  //   });

  //   it("enter checkout details", () => {
  //     $("#firstName").setValue("Ryan");
  //     $("#lastName").setValue("Kwan");
  //     $("#addressLine1").setValue("1 Real St");
  //     $("#city").setValue("Massey");
  //     $("#stateOrProvince").selectByIndex(1);
  //     browser.debug();
  //   });
});

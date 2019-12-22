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
    browser.url("https://www.ebay.com.au");

    //check title string contains 'eBay'
    const title = browser.getTitle();
    expect(title)
      .to.be.a("string")
      .that.includes("eBay");
  });

  it("search for keyword", () => {
    //click on search box, type in keyword, click on search button
    $("#gh-ac-box").click(); //no click offset as no action is taken on click
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
    let itemUrl;
    if ($("#srp-river-results ul li .s-item__link").isExisting()) {
      itemUrl = $("#srp-river-results ul li .s-item__link").getAttribute(
        "href"
      );
      $("#srp-river-results ul li .s-item__link").click({ x: rng(), y: rng() });
    } else {
      itemUrl = $("#ListViewInner li h3 a").getAttribute("href");
      $("#ListViewInner li h3 a").click({ x: rng(), y: rng() });
    }

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
  });

  it("check out as guest", () => {
    browser.pause(rngTime()); //wait before clicking to look organic
    $("#sbin-gxo-btn").click({ x: rng(), y: rng() });
    browser.waitUntil(
      () => browser.getTitle() !== "",
      5000,
      "checkout failed to load"
    );
    const title = browser.getTitle();
    expect(title).includes("Checkout");
  });

  it("enter address details", () => {
    //fill in form with dummy data
    $("#country").selectByAttribute("value", "AU");
    $("#firstName").setValue("Fish");
    $("#lastName").setValue("Market");
    $("#addressLine1").setValue("Pyrmont Bridge Rd");
    $("#city").setValue("Pyrmont");
    $("#stateOrProvince").selectByIndex(2);
    $("#email").setValue("real@realemail.com");
    $("#emailConfirm").setValue("real@realemail.com");
    $("#phoneNumber").setValue("0481123567");
    //press enter
    browser.keys("\uE007");
    browser.waitUntil(
      () => $(".module--disabled-mask").isExisting() !== true,
      15000,
      "failed to load payment settings"
    );
    expect($(".module--disabled-mask").isExisting()).eq(false);
  });

  it("enter card details", () => {
    $("#srs2").click(); //no click offset as button is too small
    browser.pause(3000);
    $("#cardNumber").setValue("4968081354596944");
    $("#cardExpiryDate").setValue("1023");
    $("#securityCode").setValue("143");
    browser.keys("\uE007");
    browser.waitUntil(
      () =>
        $(".confirm-and-pay-wrapper button").getAttribute("aria-disabled") !==
        "true",
      10000,
      "failed to enable confirm and pay button"
    );
    expect(
      $(".confirm-and-pay-wrapper button").getAttribute("aria-disabled")
    ).eq(null);
  });
  it("click confirm and pay", () => {
    $(".confirm-and-pay-wrapper button").click();
  });
});

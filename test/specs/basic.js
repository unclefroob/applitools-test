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
    let itemUrl;
    if ($("#srp-river-results ul li .s-item__link").isExisting()){
      itemUrl = $("#srp-river-results ul li .s-item__link").getAttribute(
        "href"
      );
        $('#srp-river-results ul li .s-item__link').click({ x: rng(), y: rng() });
    } else {
      itemUrl = $("#ListViewInner li h3 a").getAttribute(
        "href"
      );
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
    // browser.debug();
  });

    it("check out as guest", () => {
      browser.pause(rngTime());
      $("#sbin-gxo-btn").click({ x: rng(), y: rng() });
      browser.waitUntil(
        () => browser.getTitle() !== "",
        5000,
        "checkout failed to load"
      );
      const title = browser.getTitle();
      expect(title).includes('Checkout');
      
    });

    it("enter checkout details", () => {
      $("#country").selectByAttribute('value', 'AU');
      $("#firstName").setValue("Ryan");
      $("#lastName").setValue("Kwan");
      $("#addressLine1").setValue("1 Real St");
      $("#city").setValue("Massey");
      $("#stateOrProvince").selectByIndex(1);
      // $("#postalCode").setValue("2600");
      $("#email").setValue("real@realemail.com");
      $("#emailConfirm").setValue("real@realemail.com");
      $("#phoneNumber").setValue("0401123445");
      
      browser.keys('\uE007')
      browser.waitUntil(
        () => $(".module--disabled-mask").isExisting() !== true,
        15000,
        "failed to load payment settings"
      )
      expect($(".module--disabled-mask").isExisting()).eq(true)
    });

    it("enter checkout details", () => {
      $("#srs2").click()
      browser.pause(rngTime())
      $("#cardNumber").setValue("4968081354596944");
      $("#cardExpiryDate").setValue("1023");
      $("#securityCode").setValue("143");
      browser.keys('\uE007')
      // browser.debug();
      browser.waitUntil(
        () => $(".confirm-and-pay-wrapper button").getAttribute('aria-disabled') !== true,
        5000,
        "failed to enable confirm and pay button"
      )
      browser.debug()
    });
});

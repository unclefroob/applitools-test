// const assert = require("assert");

describe("automate customer journey on ebay web page", () => {
  it("browse to ebay web page and check the page is right", () => {
    browser.url("https://www.ebay.com.au/");
    const title = browser.getTitle();
  });

  it("select an item in popular destinations", () => {
    $(".hl-popular-destinations-element").click();
  });

  it("select first item in the first carousel", () => {
    $("#w8-xCarousel-x-carousel-items ul li").click();
  });

  it("click buy it now", () => {
    $("#binBtn_btn").click();
  });

  it("click check out as a guest", () => {
    $("#sbin-gxo-btn").click();
  });
});

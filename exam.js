const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://item.gmarket.co.kr/Item?goodsCode=2904559000";

const fetchHTML = async function (url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    return null;
  }
};

const main = async function () {
  const html = await fetchHTML(url);
  if (html) {
    // HTML을 Cheerio로 파싱
    const $ = cheerio.load(html);

    // 원하는 정보 추출 예시: 상품 제목
    const title = $("h1.itemtit").text().trim();
    console.log("상품 제목:", title);

    // 원하는 정보 추출 예시: 상품 가격
    const price = $(".price_real").text().trim();
    console.log("상품 가격:", price);

    // 원하는 정보 추출 예시: 상품 설명
    const src = $(".viewer img").attr("src");
    console.log("이미지 소스:", src);

    const categories = [];
    $(".location-navi li > a").each(function () {
      categories.push($(this).text().trim());
    });
    console.log("카테고리:", categories.join(" "));

    $(".select-item .select-itemoption-list.type_list").each(function () {
      const option = $(this).find("li a").text();
      console.log("옵션:", option);
    });
  }
};

main();

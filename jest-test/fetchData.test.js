import { fetchData, fetchData404 } from "./fetchData";
// test("测试fetchData 返回{success: true}", (done) => {
//   fetchData((data) => {
//     expect(data).toEqual({
//       success: true,
//     });
//     done();
//   });
// });

// test("测试fetchData404 返回404", () => {
//   expect.assertions(1);
//   return fetchData404().catch((e) => {
//     expect(e.toString().indexOf("404") > -1).toBe(true);
//   });
// });

// test("await 1测试fetchData 返回", async () => {
//   await expect(fetchData()).resolves.toMatchObject({
//     data: {
//       success: true,
//     },
//   });
// });

// test("await 测试fetchData404 返回404", async () => {
//   await expect(fetchData404()).rejects.toThrow();
// });

describe("测试异步请求", () => {
  test("await2测试fetchData 返回", async () => {
    await expect(fetchData()).resolves.toMatchObject({
      data: {
        success: true,
      },
    });
    const res = await fetchData();
    expect(res).toMatchObject({
      data: {
        success: true,
      },
    });
  });

  test("await 测试fetchData404 返回404", async () => {
    expect.assertions(1);
    try {
      await fetchData404();
    } catch (e) {
      expect(e.toString()).toBe("Error: Request failed with status code 404");
    }
  });
});

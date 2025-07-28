function definedTest(mod: any) {
  it('检查是否定义', () => {
    expect(mod).toBeDefined();
  });
}

export default definedTest;

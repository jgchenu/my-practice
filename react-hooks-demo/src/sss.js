function DoSomthingByIndex() {
  const [index, setIndex] = useState(-1);
  const [opnModal, setOpenModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const doSomething = () => {
    if (openModal && editable) {
      setOpenModal(true);
    }
  };
  const doAnotherSomething = () => {
    // do doSomething
  };
  // 处理index为0，对应可能是打开一个新手面板
  useEffect(() => {
    if (index === 0) {
      doSomething();
      doAnotherSomething();
      setIndex(1);
    }
  }, [index]);
  // 处理index为1，对应可能是打开一个新手气泡提示
  useEffect(() => {
    if (index === 1) {
      doSomething1();
      doAnotherSomething();
      setIndex(2);
    }
  }, [index, opnModal]);
  // 处理index为2
  useEffect(() => {
    if (index === 2) {
      doSomething2();
      doAnotherSomething();
      setIndex(3);
    }
  }, [index]);
}

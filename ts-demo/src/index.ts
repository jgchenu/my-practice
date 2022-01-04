class Person {
  constructor(public name: string, public age: number) {}

  chat() {
    console.log(`${this.name} is chatting`);
  }
}

const jgchen = new Person("jgchen", 25);

console.log(jgchen);

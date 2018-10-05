class Func {
  constructor(){
    this.name = 'zhan san';


    this.ins = ''
  }

  static getIns(){
    if(!Func.ins){
      Func.ins = new Func()
    }
    return Func.ins
  }

  info(){
    if(!this.ins){
      console.log('asdasd')
      this.ins = this.name;
    }
    return this.ins
  }

  getName(){
    console.log(this.info())
  }

}


var p1 = Func.getIns();

// p1.info()
p1.getName()
p1.getName()

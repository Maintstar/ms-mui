import { getTranslate } from './style'

describe('translate parse', function () {


  it('parse', function() {
    let a = getTranslate("translate(10,20)")
    expect(a).toEqual([10,20]);
  })

  it('parse2', function() {
    // matrix(a, c, b, d, tx, ty)
    let a = getTranslate("matrix(1,2,3,4,200,100)")
    expect(a).toEqual([200,100]);
  })

  it('parse3', function() {
    let a = getTranslate("none")
    expect(a).toEqual([0,0]);
  })

})
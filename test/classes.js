
var classes = require('classes');
var assert = require('assert');

describe('classes(el)', function(){
  var el;
  beforeEach(function(){
    el = document.createElement('div');
  })

  describe('.add(class)', function(){
    it('should add a class', function(){
      classes(el).add('foo');
      assert('foo' == el.className);
    })

    it('should not add the same class twice', function(){
      var list = classes(el);
      list.add('foo');
      list.add('foo');
      list.add('foo');
      list.add('bar');
      assert('foo bar' == el.className);
    })
  })

  describe('.remove(class)', function(){
    it('should remove a class from the beginning', function(){
      el.className = 'foo bar baz';
      classes(el).remove('foo');
      assert('bar baz' == el.className);
    })

    it('should remove a class from the middle', function(){
      el.className = 'foo bar baz';
      classes(el).remove('bar');
      assert('foo baz' == el.className);
    })

    it('should remove a class from the end', function(){
      el.className = 'foo bar baz';
      classes(el).remove('baz');
      assert('foo bar' == el.className);
    })
  })

  describe('.remove(regexp)', function(){
    it('should remove matching classes', function(){
      el.className = 'foo item-1 item-2 bar';
      classes(el).remove(/^item-/);
      assert('foo bar' == el.className);
    })
  })

  describe('.toggle(class, force)', function(){
    describe('when present', function(){
      it('should remove the class', function(){
        el.className = 'foo bar hidden';
        classes(el).toggle('hidden');
        assert('foo bar' == el.className);
      })
    })

    describe('when not present', function(){
      it('should add the class', function(){
        el.className = 'foo bar';
        classes(el).toggle('hidden');
        assert('foo bar hidden' == el.className);
      })
    })

    describe('when force is true', function(){
      it('should add the class', function(){
        el.className = 'foo bar';
        classes(el).toggle('hidden', true);
        assert('foo bar hidden' == el.className);
      })

      it('should not remove the class', function(){
        el.className = 'foo bar hidden';
        classes(el).toggle('hidden', true);
        assert('foo bar hidden' == el.className);
      })
    })

    describe('when force is false', function(){
      it('should remove the class', function(){
        el.className = 'foo bar hidden';
        classes(el).toggle('hidden', false);
        assert('foo bar' == el.className);
      })

      it('should not add the class', function(){
        el.className = 'foo bar';
        classes(el).toggle('hidden', false);
        assert('foo bar' == el.className);
      })
    })
  })

  describe('.array()', function(){
    it('should return an array of classes', function(){
      el.className = 'foo bar baz';
      var ret = classes(el).array();
      assert('foo' == ret[0]);
      assert('bar' == ret[1]);
      assert('baz' == ret[2]);
    })

    it('should return an empty array when no className is defined', function(){
      var ret = classes(el).array();
      assert(0 == ret.length);
    })

    it('should ignore leading whitespace', function(){
      el.className = '  foo bar    baz';
      var ret = classes(el).array();
      assert('foo' == ret[0]);
      assert('bar' == ret[1]);
      assert('baz' == ret[2]);
      assert(3 == ret.length);
    })

    it('should ignore trailing whitespace', function(){
      el.className = 'foo bar   baz     ';
      var ret = classes(el).array();
      assert('foo' == ret[0]);
      assert('bar' == ret[1]);
      assert('baz' == ret[2]);
      assert(3 == ret.length);
    })
  })

  describe('.has(class)', function(){
    it('should check if the class is present', function(){
      el.className = 'hey there';
      assert(false === classes(el).has('foo'));
      assert(true === classes(el).has('hey'));
      assert(true === classes(el).has('there'));
    })
  })
})

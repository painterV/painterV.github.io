---
title: "Python testing"
subtitle: "How to do testing in Python"
author: "painter"
date: 2025-01-06 09:14:00

tag:
    - Python
    - Testing
    - unittest
    - pytest
---

# Testing

## unittest
unitest是一个python测试框架，主要包含以下key concepts:
- test fixture: 固定装置
- test case: 测试用例
- test suite: 测试套件
- test runner: 测试运行器

下面我们来看一个简单的测试例子：

```
import unittest
class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')
    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())
    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
```

可以看到当我们需要构造一个测试类的时候，首先我们可以继承unittest里的基础类TestCase。
其次，我们可以自定义若干个测试用例，每一个测试用例都可以用一个类内部的一个以test_开头的函数来实现。
最后我们可以使用assert语句来检查我们预期的结果和实际的结果是否一致。

assert语句可以根据验证的结果类型有多个选择：

- assertEqual() 验证预期结果
- assertTrue() / assertFalse() 验证条件
- assertRaises() 验证异常发生

最后如何执行呢？

当完成测试用例的编写后，我们可以在命令行执行类似下面的命令：

```
# 执行指定module的测试用例
python -m unittest test_module1 test_module2

# 执行指定module的指定测试类的所有测试用例
python -m unittest test_module.TestClass

# 执行指定module的指定测试类的指定测试用例
python -m unittest test_module.TestClass.test_method
```


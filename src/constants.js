import js from './assets/javascript.png';
import java from './assets/java.png';
import c from './assets/c.png';
import cpp from './assets/cpp.png';
import python from './assets/python.png';

export const LANGUAGE_VERSIONS = {
  javascript: 63,
  java: 62,
  c: 50,
  cpp: 54,
  python: 71,
};

export const LANGUAGES = [
  ['javascript', '18.15.0', js],
  ['java', '15.0.2', java],
  ['c', '10.2.0', c],
  ['cpp', '10.2.0', cpp],
  ['python', '3.10.0', python],
];

export const LANGUAGE_NAMES = {
  javascript: 'JavaScript',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
  python: 'Python',
};

export const LANGUAGE_LOGO = {
  javascript: '../assets/js.png',
  java: '../assets/java.png',
  c: '../assets/c.png',
  cpp: '../assets/cpp.png',
  python: '../assets/python.png',
};

export const FILENAMES = {
  javascript: 'main.js',
  java: 'Main.java',
  c: 'main.c',
  cpp: 'main.cpp',
  python: 'main.py',
};

export const CODE_SNIPPETS = {
  javascript: `\nconsole.log("Hello, World!");\n`,
  java: `\npublic class Main {\n\t public static void main(String[] args) {\n\t System.out.println("Hello, World!");\n\t }\n }\n`,
  c: `\n#include <stdio.h>\n int main() {\n\t printf("Hello, World!");\n\t return 0;\n }\n`,
  cpp: `\n#include <iostream>\n int main() {\n\t std::cout << "Hello, World!";\n\t return 0;\n }\n`,
  python: `\nprint("Hello, World!")\n`,
};

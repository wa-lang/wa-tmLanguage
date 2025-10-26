/*
Language: Wz
Description: Wz(凹语言中文版) language (wz-lang). For info about language
Website: http://wa-lang.org/
Category: common, system
*/

export default function(hljs) {
  const LITERALS = [
    "真",
    "假",
    "嘀嗒",
    "我的",
    "空"
  ];
  const BUILT_INS = [
    "追加",
    "容量",
    "复数",
    "拷贝",
    "虚部",
    "长度",
    "构建",
    "新建",
    "崩溃",
    "打印",
    "输出",
    "实部",
    "删除"
  ];
  const TYPES = [
    "布尔",
    "字节",
    "单复",
    "双复",
    "错误",
    "单精",
    "双精",
    "微整型",
    "短整型",
    "普整型",
    "长整型",
    "微正整",
    "短正整",
    "普正整",
    "长正整",
    "字串",
    "整型",
    "正整",
    "地址型",
    "符文",
    "皮囊"
  ];
  const KWS = [
    "引入",

    "常量",
    "全局",
    "类型",
    "函数",

    "结构",
    "字典",
    "接口",

    "设定",

    "如果",
    "或者",
    "否则",

    "找辙",
    "有辙",
    "没辙",

    "循环",
    "迭代",
    "继续",
    "跳出",

    "押后",
    "返回",

    "区块",
    "完毕"
  ];
  const KEYWORDS = {
    keyword: KWS,
    type: TYPES,
    literal: LITERALS,
    built_in: BUILT_INS
  };
  return {
    name: 'Wz',
    aliases: [ 'wz-lang' ],
    keywords: KEYWORDS,
    illegal: '</',
    contains: [
      hljs.COMMENT('#', '$'),
      hljs.COMMENT('注:', '$'),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            begin: '`',
            end: '`'
          }
        ]
      },
      {
        className: 'number',
        variants: [
          {
            match: /-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/, // hex without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/, // hex with a present digit before . (making a digit afterwards optional)
            relevance: 0
          },
          {
            match: /-?\b0[oO](_?[0-7])*i?/, // leading 0o octal
            relevance: 0
          },
          {
            match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/, // decimal without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/, // decimal with a present digit before . (making a digit afterwards optional)
            relevance: 0
          }
        ]
      },
      { begin: /:=/ // relevance booster
      },
      {
        className: 'function',
        beginKeywords: '函数',
        end: '\\s*(\\{|$)',
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}

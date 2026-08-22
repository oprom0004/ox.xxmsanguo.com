<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
      <head>
        <title>XML Sitemap 网站地图 - ox.xxmsanguo.com</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            background-color: #060913;
            color: #cbd5e1;
            margin: 0;
            padding: 30px 20px;
            font-size: 13px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: #0b1120;
            border: 1px solid rgba(56, 189, 248, 0.15);
            border-radius: 16px;
            padding: 24px 30px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
          }
          h1 {
            color: #ffffff;
            font-size: 22px;
            margin: 0 0 8px 0;
            font-weight: 800;
          }
          .subtitle {
            color: #94a3b8;
            font-size: 13px;
            margin: 0;
          }
          .stats-badge {
            display: inline-block;
            background: rgba(6, 182, 212, 0.1);
            color: #22d3ee;
            border: 1px solid rgba(6, 182, 212, 0.25);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-family: monospace;
            margin-top: 10px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background: #0b1120;
            border: 1px solid rgba(56, 189, 248, 0.15);
            border-radius: 16px;
            overflow: hidden;
          }
          th {
            background: #0f172a;
            color: #94a3b8;
            font-weight: 600;
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid rgba(56, 189, 248, 0.1);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid rgba(56, 189, 248, 0.05);
            color: #94a3b8;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: rgba(15, 23, 42, 0.6);
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            color: #22d3ee;
            text-decoration: underline;
          }
          .priority {
            font-family: monospace;
            font-weight: bold;
            color: #22d3ee;
          }
          .date {
            font-family: monospace;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap 网站地图</h1>
            <p class="subtitle">由 ox.xxmsanguo.com 自动化 SEO 引擎生成，供 Google、Baidu、Bing 等主流搜索引擎索引抓取。</p>
            <div class="stats-badge">
              包含 URL 总数: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> 个
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 60%;">页面 URL</th>
                <th style="width: 15%;">最后更新时间</th>
                <th style="width: 10%;">更新频率</th>
                <th style="width: 15%;">抓取优先级</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="date">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="priority">
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

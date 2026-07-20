const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://gbgsykjrozmpkpsqukcp.supabase.co',
  'sb_publishable_m_Q7yrrlE5Bu_tqTD9teVg_3xjSzAj-'
);

(async () => {
  const tables = ['trend_articles', 'blog_posts'];
  const out = {};
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('slug, content');
    if (error) { console.error(t, error); continue; }
    out[t] = data;
  }
  fs.writeFileSync('/tmp/content_dump.json', JSON.stringify(out, null, 2));
  console.log('trend:', out.trend_articles.length, 'blog:', out.blog_posts.length);
})();

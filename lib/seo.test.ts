import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  DEFAULT_SITE_URL,
  resolveSiteUrl,
  buildSiteMetadata,
  buildAgencyJsonLd,
  serializeJsonLdSafe,
} from './seo';

describe('SEO & Structured Data builders', () => {
  it('safely resolves site URL and falls back when APP_URL is a placeholder', () => {
    assert.equal(resolveSiteUrl('MY_APP_URL'), DEFAULT_SITE_URL);
    assert.equal(resolveSiteUrl(''), DEFAULT_SITE_URL);
    assert.equal(
      resolveSiteUrl('https://ingo.example.com/path'),
      'https://ingo.example.com'
    );
  });

  it('builds Next.js metadata matching metadata.json title and description', () => {
    const meta = buildSiteMetadata();
    assert.equal(meta.description, SITE_DESCRIPTION);
    assert.equal(meta.openGraph?.title, SITE_TITLE);
    assert.equal(meta.openGraph?.description, SITE_DESCRIPTION);
    assert.equal(meta.twitter?.title, SITE_TITLE);
    assert.equal(meta.twitter?.description, SITE_DESCRIPTION);
  });

  it('builds Schema.org @graph with ProfessionalService and WebSite nodes', () => {
    const jsonLd = buildAgencyJsonLd();
    assert.equal(jsonLd['@context'], 'https://schema.org');
    assert.equal(jsonLd['@graph'].length, 2);
    assert.equal(jsonLd['@graph'][0]['@type'], 'ProfessionalService');
    assert.equal(jsonLd['@graph'][1]['@type'], 'WebSite');
  });

  it('escapes < characters in JSON-LD serialization to prevent script injection', () => {
    const unsafe = { title: '</script><script>alert(1)</script>' };
    const serialized = serializeJsonLdSafe(unsafe);
    assert.equal(serialized.includes('</script>'), false);
    assert.equal(serialized.includes('\\u003c/script>'), true);
  });
});


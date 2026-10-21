// Greemo template names used in content, mapped to the Vue sections that render them (same pattern as Andrews UK).
// The old one-per-page wrappers (home, issues, issue, contact) are no longer used by any page.
import Hero from './hero/component.vue'
import Ticker from './ticker/component.vue'
import IssueFeature from './issue-feature/component.vue'
import SpecialBand from './special-band/component.vue'
import IssueGrid from './issue-grid/component.vue'
import WritersBand from './writers-band/component.vue'
import Newsletter from './newsletter/component.vue'
import PageHero from './page-hero/component.vue'
import IssueGroup from './issue-group/component.vue'
import StorySplit from './story-split/component.vue'
import TeamGrid from './team-grid/component.vue'
import CtaBand from './cta-band/component.vue'
import PitchSplit from './pitch-split/component.vue'
import SayHello from './say-hello/component.vue'
import IssueHero from './issue-hero/component.vue'
import IssueContents from './issue-contents/component.vue'
import IssuePreviews from './issue-previews/component.vue'
import IssueQuality from './issue-quality/component.vue'
import IssueMore from './issue-more/component.vue'

export const sections = {
  hero: Hero,
  ticker: Ticker,
  'issue-feature': IssueFeature,
  'special-band': SpecialBand,
  'issue-grid': IssueGrid,
  'writers-band': WritersBand,
  newsletter: Newsletter,
  'page-hero': PageHero,
  'issue-group': IssueGroup,
  'story-split': StorySplit,
  'team-grid': TeamGrid,
  'cta-band': CtaBand,
  'pitch-split': PitchSplit,
  'say-hello': SayHello,
  'issue-hero': IssueHero,
  'issue-contents': IssueContents,
  'issue-previews': IssuePreviews,
  'issue-quality': IssueQuality,
  'issue-more': IssueMore
}

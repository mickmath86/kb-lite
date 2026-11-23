'use client'

import { Document, Font, Link, Page, pdf, StyleSheet, Svg, Circle, Text, View } from '@react-pdf/renderer'

import type { FoundReport, GbpReport, Grade, NotFoundReport, Recommendation } from '@/lib/gbp-report/types'

/**
 * Downloadable PDF version of the report. Loaded only when the visitor clicks
 * Download, so the PDF library never ships with the page itself.
 */

const BOOKING = 'https://kickbord.com/booking'

let fontsReady = false
function registerFonts() {
  if (fontsReady || typeof window === 'undefined') return
  Font.register({ family: 'Instrument Serif', src: `${window.location.origin}/fonts/InstrumentSerif-Regular.ttf` })
  Font.registerHyphenationCallback((word) => [word])
  fontsReady = true
}

const ink = '#1a1c15'
const body = '#4a4f3e'
const muted = '#6f7562'
const line = '#e3e5dc'
const paper = '#f6f6f1'
const brand = '#596352'

const GRADE_COLOR: Record<Grade, string> = { A: '#596352', B: '#6f7d5f', C: '#b8892e', D: '#b96a35', F: '#a2453a' }
const STATUS_COLOR = { good: '#596352', fair: '#b8892e', poor: '#a2453a' }
const PRIORITY_COLOR: Record<Recommendation['priority'], string> = { High: '#a2453a', Medium: '#b8892e', Low: muted }

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 48, paddingHorizontal: 48, fontFamily: 'Helvetica', fontSize: 10, color: body, lineHeight: 1.45 },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  brand: { fontFamily: 'Instrument Serif', fontSize: 18, color: ink },
  brandMeta: { fontSize: 8.5, color: muted },
  hero: { flexDirection: 'row', alignItems: 'center', backgroundColor: paper, borderRadius: 12, padding: 20, marginBottom: 22 },
  eyebrow: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: brand, textTransform: 'uppercase', letterSpacing: 0.6 },
  h1: { fontFamily: 'Instrument Serif', fontSize: 26, color: ink, lineHeight: 1.1, marginTop: 4 },
  h2: { fontFamily: 'Instrument Serif', fontSize: 18, color: ink, lineHeight: 1.3, marginBottom: 10, marginTop: 18 },
  small: { fontSize: 8.5, color: muted },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: line, paddingVertical: 6 },
  th: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: muted },
  bold: { fontFamily: 'Helvetica-Bold', color: ink },
  rec: { flexDirection: 'row', borderWidth: 1, borderColor: line, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10, marginBottom: 6 },
  recNum: { fontFamily: 'Instrument Serif', fontSize: 16, color: brand, width: 26 },
  pill: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 6, marginLeft: 6 },
  cta: { backgroundColor: ink, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginTop: 14 },
  footer: { position: 'absolute', bottom: 20, left: 48, right: 48, height: 14, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7.5, color: muted, lineHeight: 1.2 },
})

function Ring({ score, grade }: { score: number; grade: Grade }) {
  const size = 92
  const stroke = 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <View style={{ width: size, height: size, marginRight: 20 }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke="#dfe2d6" strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={GRADE_COLOR[grade]}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${(c * score) / 100} ${c}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Instrument Serif', fontSize: 30, color: ink, lineHeight: 1 }}>{score}</Text>
        <Text style={{ fontSize: 6.5, color: muted, marginTop: 2 }}>OUT OF 100</Text>
      </View>
    </View>
  )
}

function Header({ date }: { date: string }) {
  return (
    <View style={s.brandRow} fixed>
      <Text style={s.brand}>Kickbord</Text>
      <Text style={s.brandMeta}>Google Business Profile report · {date}</Text>
    </View>
  )
}

function Footer() {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>Based on public Google Maps data. Scores are Kickbord&apos;s estimate, not a Google ranking.</Text>
    </View>
  )
}

function Recs({ items }: { items: Recommendation[] }) {
  return (
    <View>
      {items.map((rec, i) => (
        <View key={rec.title} style={s.rec} wrap={false}>
          <Text style={s.recNum}>{String(i + 1).padStart(2, '0')}</Text>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={s.bold}>{rec.title}</Text>
              <Text style={[s.pill, { color: PRIORITY_COLOR[rec.priority], backgroundColor: `${PRIORITY_COLOR[rec.priority]}1f` }]}>{rec.priority}</Text>
              {rec.pointsAvailable > 0 ? <Text style={[s.small, { marginLeft: 6 }]}>+{rec.pointsAvailable} pts</Text> : null}
            </View>
            <Text style={{ marginTop: 2 }}>{rec.action}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

function Manual({ items }: { items: string[] }) {
  return (
    <View wrap={false}>
      <Text style={s.h2}>Also check these yourself</Text>
      <Text style={[s.small, { marginBottom: 6 }]}>Google does not share these publicly, so they are not in your score.</Text>
      {items.map((item) => {
        const [lead, ...rest] = item.split(': ')
        return (
          <Text key={item} style={{ marginBottom: 3 }}>
            <Text style={s.bold}>• {lead}. </Text>
            {rest.join(': ')}
          </Text>
        )
      })}
    </View>
  )
}

function Cta() {
  return (
    <View style={s.cta} wrap={false}>
      <Text style={{ fontFamily: 'Instrument Serif', fontSize: 17, color: '#ffffff', lineHeight: 1.3, marginBottom: 2 }}>Want help fixing these?</Text>
      <Text style={{ color: '#d9dccf' }}>
        We set up review requests, photos, hours and categories for home-service businesses, so your profile keeps working while you are on the job.
      </Text>
      <Link src={BOOKING} style={{ color: '#ffffff', fontFamily: 'Helvetica-Bold', marginTop: 6, textDecoration: 'underline' }}>
        Book a free 30-minute call: kickbord.com/booking
      </Link>
    </View>
  )
}

function SampleNote({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <Text style={{ backgroundColor: '#efe8f0', color: '#4d3a4f', padding: 8, borderRadius: 6, marginBottom: 12, fontSize: 9 }}>
      Sample data. The business and competitors in this report are made up.
    </Text>
  )
}

function FoundDoc({ report, date }: { report: FoundReport; date: string }) {
  const b = report.business
  return (
    <Page size="LETTER" style={s.page}>
      <Header date={date} />
      <Footer />
      <SampleNote show={report.sample} />
      <View style={s.hero}>
        <Ring score={report.score} grade={report.grade} />
        <View style={{ flex: 1 }}>
          <Text style={s.eyebrow}>Grade {report.grade}</Text>
          <Text style={s.h1}>{b.name}</Text>
          <Text style={[s.small, { marginTop: 3 }]}>
            {b.address}
            {b.primaryCategory ? ` · ${b.primaryCategory}` : ''}
          </Text>
          <Text style={{ marginTop: 8, color: ink }}>{report.summary}</Text>
        </View>
      </View>

      <Text style={[s.h2, { marginTop: 0 }]}>Your score, line by line</Text>
      <View style={[s.row, { paddingTop: 0 }]}>
        <Text style={[s.th, { width: 110 }]}>Check</Text>
        <Text style={[s.th, { flex: 1 }]}>What we found</Text>
        <Text style={[s.th, { width: 44, textAlign: 'right' }]}>Points</Text>
      </View>
      {report.checks.map((c) => (
        <View key={c.id} style={s.row} wrap={false}>
          <View style={{ width: 110, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: STATUS_COLOR[c.status], marginRight: 6 }} />
            <Text style={s.bold}>{c.label}</Text>
          </View>
          <Text style={{ flex: 1 }}>
            <Text style={s.bold}>{c.value}. </Text>
            {c.detail}
          </Text>
          <Text style={[s.bold, { width: 44, textAlign: 'right' }]}>
            {c.points}/{c.maxPoints}
          </Text>
        </View>
      ))}

      <Text style={s.h2} minPresenceAhead={60}>What to fix first</Text>
      {report.recommendations.length ? <Recs items={report.recommendations} /> : <Text>Nothing major to fix. Keep reviews and photos coming.</Text>}

      {report.competitors.length > 1 ? (
        <View wrap={false}>
          <Text style={s.h2}>You vs. the top {report.benchmarks.competitorCount} nearby</Text>
          <View style={[s.row, { paddingTop: 0 }]}>
            <Text style={[s.th, { flex: 1 }]}>Business</Text>
            <Text style={[s.th, { width: 44, textAlign: 'right' }]}>Rating</Text>
            <Text style={[s.th, { width: 52, textAlign: 'right' }]}>Reviews</Text>
            <Text style={[s.th, { width: 44, textAlign: 'right' }]}>Photos</Text>
            <Text style={[s.th, { width: 40, textAlign: 'right' }]}>Hours</Text>
            <Text style={[s.th, { width: 48, textAlign: 'right' }]}>Website</Text>
          </View>
          {report.competitors.map((row) => (
            <View key={`${row.name}-${row.isYou}`} style={[s.row, row.isYou ? { backgroundColor: '#eef0e8' } : {}]}>
              <Text style={[{ flex: 1 }, row.isYou ? s.bold : {}]}>
                {row.name}
                {row.isYou ? '  (you)' : ''}
              </Text>
              <Text style={{ width: 44, textAlign: 'right' }}>{row.rating === null ? '–' : row.rating.toFixed(1)}</Text>
              <Text style={{ width: 52, textAlign: 'right' }}>{row.reviewCount.toLocaleString('en-US')}</Text>
              <Text style={{ width: 44, textAlign: 'right' }}>{row.photoCount >= 10 ? '10+' : String(row.photoCount)}</Text>
              <Text style={{ width: 40, textAlign: 'right' }}>{row.hasHours ? 'Yes' : 'No'}</Text>
              <Text style={{ width: 48, textAlign: 'right' }}>{row.hasWebsite ? 'Yes' : 'No'}</Text>
            </View>
          ))}
          <Text style={[s.small, { marginTop: 4 }]}>Google shares up to 10 photos per profile, so 10+ means 10 or more.</Text>
        </View>
      ) : null}

      <Manual items={report.manualChecks} />
      <Cta />
    </Page>
  )
}

function NotFoundDoc({ report, date }: { report: NotFoundReport; date: string }) {
  return (
    <Page size="LETTER" style={s.page}>
      <Header date={date} />
      <Footer />
      <SampleNote show={report.sample} />
      <View style={[s.hero, { flexDirection: 'column', alignItems: 'flex-start' }]}>
        <Text style={s.eyebrow}>No profile found</Text>
        <Text style={s.h1}>We could not find a Google profile for {new URL(report.website).hostname}</Text>
        <Text style={{ marginTop: 8, color: ink }}>
          That usually means the profile is not claimed, is not linked to your website, or does not exist yet. Customers searching Maps may not find you.
        </Text>
      </View>
      <Text style={[s.h2, { marginTop: 0 }]}>Where to start</Text>
      <Recs items={report.recommendations} />
      <Manual items={report.manualChecks} />
      <Cta />
    </Page>
  )
}

export function ReportDocument({ report }: { report: GbpReport }) {
  const date = new Date(report.generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const title = report.kind === 'found' ? `${report.business.name} – Google Business Profile report` : 'Google Business Profile report'
  return (
    <Document title={title} author="Kickbord" subject="Google Business Profile report">
      {report.kind === 'found' ? <FoundDoc report={report} date={date} /> : <NotFoundDoc report={report} date={date} />}
    </Document>
  )
}

function fileName(report: GbpReport) {
  const base = report.kind === 'found' ? report.business.name : new URL(report.website).hostname
  const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'business'
  return `${slug}-google-profile-report.pdf`
}

export async function downloadReportPdf(report: GbpReport) {
  registerFonts()
  const blob = await pdf(<ReportDocument report={report} />).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName(report)
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

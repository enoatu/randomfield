import Layout from '@c/Layout'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <Layout title="Top">
      <main>
        <h1 className="title">{t('title', { ns: 'common' })}</h1>
        <p className="description">{t('description', { ns: 'common' })}</p>
        <div className="grid">
          <a href="./count-text" className="card">
            <h3>Count Text &rarr;</h3>
            <p>Count Text</p>
          </a>
          <a href="./create-loop-text" className="card">
            <h3>Create Loop &rarr;</h3>
            <p>Create Loop Text</p>
          </a>
          <a href="./create-image" className="card">
            <h3>{t('title', { ns: 'create-image' })} &rarr;</h3>
            <p>{t('description', { ns: 'create-image'})}</p>
          </a>
          <a href="./pretty-json" className="card">
            <h3>Pretty Json &rarr;</h3>
            <p>Smart Pretty Json</p>
          </a>
          <a href="./delete-spaces-only-line" className="card">
            <h3>Delete Spaces Only Line &rarr;</h3>
            <p>Simple Spaces Only Line Remove For Efficient</p>
          </a>
          <a href="./delete-line-breaks" className="card">
            <h3>Delete Line Breaks &rarr;</h3>
            <p>Simple Line Breaks Remove For Efficient</p>
          </a>
          <a href="./keep-ratio" className="card">
            <h3>KeepRatioResize &rarr;</h3>
            <p>Simple Text Replacer For Efficient</p>
          </a>
          <a href="./replacer" className="card">
            <h3>Replacer &rarr;</h3>
            <p>Simple Text Replacer For Efficient</p>
          </a>
          <a href="./combination" className="card">
            <h3>Combination &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="./multi-replacer" className="card">
            <h3>MultiReplacer &rarr;</h3>
            <p>MultiReplacer</p>
          </a>
          <a href="./highlight-string" className="card">
            <h3>Highlight String &rarr;</h3>
            <p>Instantly Highlight String by number</p>
          </a>
          <a href="./create-num-string" className="card">
            <h3>CreateNumString &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
          <a href="./merge-text" className="card">
            <h3>MergeText &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
          <a href="./merge-text-for-sql" className="card">
            <h3>MergeText For SQL &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
          <a href="./utf16-decoder" className="card">
            <h3>utf16 decoder &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  )
}

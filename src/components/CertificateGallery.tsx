import { Download, ExternalLink, Filter } from 'lucide-react'
import { useMemo, useState } from 'react'
import { certificateItems } from '../data/portfolio'
import type { CertificateItem } from '../data/portfolio'

const categories: Array<CertificateItem['category'] | 'All'> = [
  'All',
  'Awards',
  'Academic',
  'Experience',
  'Language',
  'CV',
]

export function CertificateGallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return certificateItems
    return certificateItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="certificate-gallery">
      <div className="filter-row" aria-label="Certificate filters">
        <Filter size={17} aria-hidden="true" />
        {categories.map((category) => (
          <button
            className={category === activeCategory ? 'active' : ''}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="certificate-grid">
        {filteredItems.map((certificate) => (
          <article className="certificate-card" key={certificate.pdfPath}>
            <a href={certificate.pdfPath} target="_blank" rel="noreferrer" aria-label={`Open ${certificate.title}`}>
              <img src={certificate.thumbnailPath} alt={`${certificate.title} preview`} loading="lazy" />
            </a>
            <div className="certificate-meta">
              <span>{certificate.category}</span>
              <h3>{certificate.title}</h3>
              <p>{certificate.issuer}</p>
              <small>{certificate.date}</small>
            </div>
            <div className="certificate-actions">
              <a href={certificate.pdfPath} target="_blank" rel="noreferrer">
                <ExternalLink size={16} />
                Open PDF
              </a>
              <a href={certificate.pdfPath} download>
                <Download size={16} />
                Download
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import { blogService } from '../services/api';
import { formatDateShort, truncate } from '../utils/formatters';
import { SkeletonText } from '../components/ui/Skeleton';
import Skeleton from '../components/ui/Skeleton';

export default function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService.getAll().then(data => { setPosts(data); setLoading(false); });
  }, []);

  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <PageWrapper>
      <div style={{ padding: '40px 0 28px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em', color: C.text }}>
            Maecky <span style={{ color: C.amber }}>Journal</span>
          </h1>
          <p style={{ color: C.textMid, marginTop: '8px', fontSize: '15px' }}>
            Gear reviews, buying guides, and stories from Kenya's music community.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {loading ? (
            <div>
              <Skeleton height="320px" style={{ borderRadius: '16px', marginBottom: '40px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {[1, 2, 3].map(i => <div key={i}><Skeleton height="200px" style={{ borderRadius: '10px', marginBottom: '12px' }} /><SkeletonText lines={3} /></div>)}
              </div>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <div
                  onClick={() => navigate(`/blog/${featured.slug}`)}
                  style={{
                    display: 'grid', gridTemplateColumns: '1.5fr 1fr', overflow: 'hidden',
                    background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px',
                    marginBottom: '48px', cursor: 'pointer', transition: TRANSITION.mid,
                  }}
                  className="featured-card"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,135,26,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                  <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(59,130,246,0.12)', color: C.blue, border: '1px solid rgba(59,130,246,0.3)', borderRadius: '4px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', marginBottom: '14px', width: 'fit-content' }}>{featured.category}</span>
                    <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '22px', lineHeight: 1.3, color: C.text, marginBottom: '12px' }}>{featured.title}</h2>
                    <p style={{ fontSize: '14px', color: C.textMid, lineHeight: 1.75, marginBottom: '18px' }}>{truncate(featured.excerpt, 120)}</p>
                    <div style={{ fontSize: '12px', color: C.textLo }}>{formatDateShort(featured.date)} · {featured.readTime} min read</div>
                  </div>
                </div>
              )}

              {/* Post grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="blog-grid">
                {rest.map(post => (
                  <article
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: TRANSITION.mid }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,135,26,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
                    <div style={{ padding: '20px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(59,130,246,0.12)', color: C.blue, border: '1px solid rgba(59,130,246,0.3)', borderRadius: '4px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', marginBottom: '10px' }}>{post.category}</span>
                      <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '16px', lineHeight: 1.35, color: C.text, marginBottom: '8px' }}>{post.title}</h3>
                      <p style={{ fontSize: '13px', color: C.textMid, lineHeight: 1.65, marginBottom: '14px' }}>{truncate(post.excerpt, 100)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: C.textLo }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: C.amberLo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: C.amber }}>{post.author[0]}</div>
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{formatDateShort(post.date)}</span>
                        <span>·</span>
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card img { height: 240px !important; }
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Breadcrumb from '../components/ui/Breadcrumb';
import Skeleton from '../components/ui/Skeleton';
import { SkeletonText } from '../components/ui/Skeleton';
import { blogService } from '../services/api';
import { formatDate, truncate } from '../utils/formatters';

export default function BlogPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      blogService.getById(postId),
      blogService.getRelated(postId),
    ]).then(([p, r]) => {
      setPost(p);
      setRelated(r);
      setLoading(false);
    }).catch(() => navigate('/blog'));
  }, [postId]);

  if (loading) {
    return (
      <PageWrapper>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 32px' }}>
          <Skeleton height="18px" width="40%" style={{ marginBottom: '24px' }} />
          <Skeleton height="40px" width="90%" style={{ marginBottom: '12px' }} />
          <Skeleton height="40px" width="70%" style={{ marginBottom: '24px' }} />
          <Skeleton height="360px" style={{ borderRadius: '12px', marginBottom: '32px' }} />
          <SkeletonText lines={6} />
        </div>
      </PageWrapper>
    );
  }

  if (!post) return null;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: truncate(post.title, 30), href: `/blog/${post.slug}` },
  ];

  return (
    <PageWrapper>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 32px 64px' }}>
        <Breadcrumb items={breadcrumbs} style={{ marginBottom: '28px' }} />

        <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(59,130,246,0.12)', color: C.blue, border: '1px solid rgba(59,130,246,0.3)', borderRadius: '4px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', marginBottom: '18px' }}>
          {post.category}
        </span>

        <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(26px, 4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: C.text, marginBottom: '18px' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px', flexWrap: 'wrap' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: C.amberLo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.display, fontWeight: 700, fontSize: '14px', color: C.amber }}>
            {post.author[0]}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: C.text }}>{post.author}</div>
            <div style={{ fontSize: '12px', color: C.textMid }}>{post.authorRole}</div>
          </div>
          <span style={{ color: C.textLo }}>·</span>
          <span style={{ fontSize: '13px', color: C.textMid }}>{formatDate(post.date)}</span>
          <span style={{ color: C.textLo }}>·</span>
          <span style={{ fontSize: '13px', color: C.textMid }}>{post.readTime} min read</span>
        </div>

        <img
          src={post.image}
          alt={post.title}
          style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: '12px', marginBottom: '40px', border: `1px solid ${C.border}` }}
        />

        {/* Article content */}
        <div style={{ fontSize: '16px', color: C.textMid, lineHeight: 1.9 }}>
          {post.content?.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.includes('**')) {
              const parts = para.split('**');
              return (
                <p key={i} style={{ marginBottom: '18px' }}>
                  {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: C.text, fontWeight: 700 }}>{p}</strong> : p)}
                </p>
              );
            }
            if (para.startsWith('#')) {
              const level = para.match(/^#+/)?.[0].length || 2;
              const text = para.replace(/^#+\s/, '');
              return <h2 key={i} style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: level === 2 ? '22px' : '18px', color: C.text, margin: '32px 0 14px', letterSpacing: '-0.01em' }}>{text}</h2>;
            }
            if (para.startsWith('- ') || para.startsWith('1. ')) {
              const items = para.split('\n').filter(Boolean);
              return (
                <ul key={i} style={{ paddingLeft: '22px', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map((item, j) => (
                    <li key={j} style={{ color: C.textMid }}>{item.replace(/^(-|\d+\.)\s/, '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i} style={{ marginBottom: '18px' }}>{para}</p>;
          })}
        </div>

        {/* Tags */}
        {post.tags && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '36px', paddingTop: '28px', borderTop: `1px solid ${C.border}` }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '99px', padding: '4px 12px', fontSize: '12px', color: C.textMid, fontFamily: FONTS.body }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ marginTop: '56px' }}>
            <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '20px' }}>
              Related Posts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {related.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/blog/${p.slug}`)}
                  style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(232,135,26,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                  <div style={{ padding: '14px' }}>
                    <span style={{ fontSize: '10px', color: C.blue, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.category}</span>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '14px', color: C.text, marginTop: '6px', lineHeight: 1.4 }}>{p.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
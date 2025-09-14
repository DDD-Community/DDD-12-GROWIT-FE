import { urls } from '@/shared/constants/urls';
import React from 'react';

// 링크 데이터 타입 정의
interface LinkItem {
  label: string;
  href: string;
}

interface LinkSection {
  title: string;
  links: LinkItem[];
}

const FooterLinks = () => {
  const supportLinks: LinkItem[] = [
    { label: '개인정보처리방침', href: urls.customerInfo },
    { label: '이용약관', href: urls.termsOfService },
  ];
  const linkSections: LinkSection[] = [{ title: '지원', links: supportLinks }];

  const renderLinks = (links: LinkItem[]) => {
    return links.map((link, index) => (
      <li key={index}>
        <a href={link.href} className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">
          {link.label}
        </a>
      </li>
    ));
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#35D942] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">G</span>
              </div>
              <span className="text-xl font-bold text-white">GROWIT</span>
            </div>
            <p className="text-gray-400 text-sm">
              누구나 더 나은 내일로 성장할 수 있도록,
              <br />
              GROWIT이 함께합니다.
            </p>
          </div>

          {/* 동적으로 생성되는 링크 섹션들 */}
          {linkSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">{renderLinks(section.links)}</ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">© 2025 GROWIT. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;

export default {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '타이포그래피 토큰입니다. 각 스타일은 Regular, Medium, Bold 3가지 굵기로 제공됩니다.',
      },
    },
  },
};

export const Display = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Display</h2>
      <div className="space-y-1">
        <p className="display-1-regular">Display 1 Regular</p>
        <p className="display-1-medium">Display 1 Medium</p>
        <p className="display-1-bold">Display 1 Bold</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="display-2-regular">Display 2 Regular</p>
        <p className="display-2-medium">Display 2 Medium</p>
        <p className="display-2-bold">Display 2 Bold</p>
      </div>
    </div>
  </div>
);

export const Title = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Title</h2>
      <div className="space-y-1">
        <p className="title-1-regular">Title 1 Regular</p>
        <p className="title-1-medium">Title 1 Medium</p>
        <p className="title-1-bold">Title 1 Bold</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="title-2-regular">Title 2 Regular</p>
        <p className="title-2-medium">Title 2 Medium</p>
        <p className="title-2-bold">Title 2 Bold</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="title-3-regular">Title 3 Regular</p>
        <p className="title-3-medium">Title 3 Medium</p>
        <p className="title-3-bold">Title 3 Bold</p>
      </div>
    </div>
  </div>
);

export const Heading = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Heading</h2>
      <div className="space-y-1">
        <p className="heading-1-regular">Heading 1 Regular</p>
        <p className="heading-1-medium">Heading 1 Medium</p>
        <p className="heading-1-bold">Heading 1 Bold</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="heading-2-regular">Heading 2 Regular</p>
        <p className="heading-2-medium">Heading 2 Medium</p>
        <p className="heading-2-bold">Heading 2 Bold</p>
      </div>
    </div>
  </div>
);

export const Headline = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Headline</h2>
      <div className="space-y-1">
        <p className="headline-1-regular">Headline 1 Regular</p>
        <p className="headline-1-medium">Headline 1 Medium</p>
        <p className="headline-1-bold">Headline 1 Bold</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="headline-2-regular">Headline 2 Regular</p>
        <p className="headline-2-medium">Headline 2 Medium</p>
        <p className="headline-2-bold">Headline 2 Bold</p>
      </div>
    </div>
  </div>
);

export const Body = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Body</h2>
      <div className="space-y-1">
        <p className="body-1-regular">Body 1 Regular - 본문 텍스트에 사용되는 기본 스타일입니다.</p>
        <p className="body-1-medium">Body 1 Medium - 본문 텍스트에 사용되는 중간 굵기 스타일입니다.</p>
        <p className="body-1-bold">Body 1 Bold - 본문 텍스트에 사용되는 굵은 스타일입니다.</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="body-2-regular">Body 2 Regular - 보조 본문 텍스트에 사용되는 기본 스타일입니다.</p>
        <p className="body-2-medium">Body 2 Medium - 보조 본문 텍스트에 사용되는 중간 굵기 스타일입니다.</p>
        <p className="body-2-bold">Body 2 Bold - 보조 본문 텍스트에 사용되는 굵은 스타일입니다.</p>
      </div>
    </div>
  </div>
);

export const Label = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Label</h2>
      <div className="space-y-1">
        <p className="label-1-regular">Label 1 Regular</p>
        <p className="label-1-medium">Label 1 Medium</p>
        <p className="label-1-bold">Label 1 Bold</p>
      </div>
      <div className="space-y-1 mt-4">
        <p className="label-2-regular">Label 2 Regular</p>
        <p className="label-2-medium">Label 2 Medium</p>
        <p className="label-2-bold">Label 2 Bold</p>
      </div>
    </div>
  </div>
);

export const Caption = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Caption</h2>
      <div className="space-y-1">
        <p className="caption-1-regular">Caption 1 Regular</p>
        <p className="caption-1-medium">Caption 1 Medium</p>
        <p className="caption-1-bold">Caption 1 Bold</p>
      </div>
    </div>
  </div>
);

export const AllTypography = () => (
  <div className="space-y-8 p-6">
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">전체 타이포그래피 스케일</h2>

      {/* Display */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Display</h3>
        <div className="space-y-1">
          <p className="display-1-regular">Display 1 Regular (56px)</p>
          <p className="display-1-medium">Display 1 Medium (56px)</p>
          <p className="display-1-bold">Display 1 Bold (56px)</p>
          <p className="display-2-regular">Display 2 Regular (40px)</p>
          <p className="display-2-medium">Display 2 Medium (40px)</p>
          <p className="display-2-bold">Display 2 Bold (40px)</p>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Title</h3>
        <div className="space-y-1">
          <p className="title-1-regular">Title 1 Regular (36px)</p>
          <p className="title-1-medium">Title 1 Medium (36px)</p>
          <p className="title-1-bold">Title 1 Bold (36px)</p>
          <p className="title-2-regular">Title 2 Regular (28px)</p>
          <p className="title-2-medium">Title 2 Medium (28px)</p>
          <p className="title-2-bold">Title 2 Bold (28px)</p>
          <p className="title-3-regular">Title 3 Regular (24px)</p>
          <p className="title-3-medium">Title 3 Medium (24px)</p>
          <p className="title-3-bold">Title 3 Bold (24px)</p>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Heading</h3>
        <div className="space-y-1">
          <p className="heading-1-regular">Heading 1 Regular (22px)</p>
          <p className="heading-1-medium">Heading 1 Medium (22px)</p>
          <p className="heading-1-bold">Heading 1 Bold (22px)</p>
          <p className="heading-2-regular">Heading 2 Regular (20px)</p>
          <p className="heading-2-medium">Heading 2 Medium (20px)</p>
          <p className="heading-2-bold">Heading 2 Bold (20px)</p>
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Headline</h3>
        <div className="space-y-1">
          <p className="headline-1-regular">Headline 1 Regular (18px)</p>
          <p className="headline-1-medium">Headline 1 Medium (18px)</p>
          <p className="headline-1-bold">Headline 1 Bold (18px)</p>
          <p className="headline-2-regular">Headline 2 Regular (17px)</p>
          <p className="headline-2-medium">Headline 2 Medium (17px)</p>
          <p className="headline-2-bold">Headline 2 Bold (17px)</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Body</h3>
        <div className="space-y-1">
          <p className="body-1-regular">Body 1 Regular (16px) - 일반적인 본문 텍스트</p>
          <p className="body-1-medium">Body 1 Medium (16px) - 중요한 본문 텍스트</p>
          <p className="body-1-bold">Body 1 Bold (16px) - 강조된 본문 텍스트</p>
          <p className="body-2-regular">Body 2 Regular (15px) - 보조 본문 텍스트</p>
          <p className="body-2-medium">Body 2 Medium (15px) - 중요한 보조 본문</p>
          <p className="body-2-bold">Body 2 Bold (15px) - 강조된 보조 본문</p>
        </div>
      </div>

      {/* Label */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Label</h3>
        <div className="space-y-1">
          <p className="label-1-regular">Label 1 Regular (14px)</p>
          <p className="label-1-medium">Label 1 Medium (14px)</p>
          <p className="label-1-bold">Label 1 Bold (14px)</p>
          <p className="label-2-regular">Label 2 Regular (13px)</p>
          <p className="label-2-medium">Label 2 Medium (13px)</p>
          <p className="label-2-bold">Label 2 Bold (13px)</p>
        </div>
      </div>

      {/* Caption */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Caption</h3>
        <div className="space-y-1">
          <p className="caption-1-regular">Caption 1 Regular (12px)</p>
          <p className="caption-1-medium">Caption 1 Medium (12px)</p>
          <p className="caption-1-bold">Caption 1 Bold (12px)</p>
        </div>
      </div>
    </div>
  </div>
);

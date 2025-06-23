export default {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  globals: {
    backgrounds: 'dark',
  },
};

const TypographyBlock = ({ label, className, children }: { label: string; className: string; children: string }) => (
  <div className="flex items-start justify-between border-b border-gray-700 py-2">
    <div className={className}>{children}</div>
    <code className="text-md text-white font-semibold ml-4 whitespace-nowrap">className: {className}</code>
  </div>
);

export const TypographyGuide = () => (
  <div className="space-y-8 p-8 text-white min-h-screen">
    <h2 className="text-2xl font-bold mb-6">📚 타이포그래피</h2>

    {/* Display */}
    <section>
      <h3 className="text-md text-gray-400 font-semibold uppercase mb-2">Display</h3>
      <TypographyBlock className="display-1-regular" label="Display 1 Regular">
        Display 1 Regular
      </TypographyBlock>
      <TypographyBlock className="display-1-medium" label="Display 1 Medium">
        Display 1 Medium
      </TypographyBlock>
      <TypographyBlock className="display-1-bold" label="Display 1 Bold">
        Display 1 Bold
      </TypographyBlock>
      <TypographyBlock className="display-2-regular" label="Display 2 Regular">
        Display 2 Regular
      </TypographyBlock>
      <TypographyBlock className="display-2-medium" label="Display 2 Medium">
        Display 2 Medium
      </TypographyBlock>
      <TypographyBlock className="display-2-bold" label="Display 2 Bold">
        Display 2 Bold
      </TypographyBlock>
    </section>

    {/* Title */}
    <section>
      <h3 className="text-md text-gray-400 font-semibold uppercase mb-2">Title</h3>
      <TypographyBlock className="title-1-regular" label="Title 1 Regular">
        Title 1 Regular
      </TypographyBlock>
      <TypographyBlock className="title-2-medium" label="Title 2 Medium">
        Title 2 Medium
      </TypographyBlock>
      <TypographyBlock className="title-3-bold" label="Title 3 Bold">
        Title 3 Bold
      </TypographyBlock>
    </section>

    {/* Heading */}
    <section>
      <h3 className="text-md text-gray-400 font-semibold uppercase mb-2">Heading</h3>
      <TypographyBlock className="heading-1-regular" label="Heading 1 Regular">
        Heading 1 Regular
      </TypographyBlock>
      <TypographyBlock className="heading-2-bold" label="Heading 2 Bold">
        Heading 2 Bold
      </TypographyBlock>
    </section>

    {/* Body */}
    <section>
      <h3 className="text-md text-gray-400 font-semibold uppercase mb-2">Body</h3>
      <TypographyBlock className="body-1-regular" label="Body 1 Regular">
        Body 1 Regular - 본문에 자주 사용
      </TypographyBlock>
      <TypographyBlock className="body-2-bold" label="Body 2 Bold">
        Body 2 Bold - 강조 텍스트
      </TypographyBlock>
    </section>

    {/* Label */}
    <section>
      <h3 className="text-md text-gray-400 font-semibold uppercase mb-2">Label</h3>
      <TypographyBlock className="label-1-regular" label="Label 1 Regular">
        Label 1 Regular
      </TypographyBlock>
      <TypographyBlock className="label-2-medium" label="Label 2 Medium">
        Label 2 Medium
      </TypographyBlock>
    </section>

    {/* Caption */}
    <section>
      <h3 className="text-md text-gray-400 font-semibold uppercase mb-2">Caption</h3>
      <TypographyBlock className="caption-1-regular" label="Caption 1 Regular">
        Caption 1 Regular
      </TypographyBlock>
      <TypographyBlock className="caption-1-bold" label="Caption 1 Bold">
        Caption 1 Bold
      </TypographyBlock>
    </section>
  </div>
);

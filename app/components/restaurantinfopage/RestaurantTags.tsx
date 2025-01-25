import React from "react";
import Tag from "./Tags";

type RestaurantTagsProps = {
  tags: any[];
};

const RestaurantTags: React.FC<RestaurantTagsProps> = ({ tags }) => {
  const groupTags = (tags: any[]) => {
    return tags.reduce((acc: any, tag: any) => {
      const { type } = tag.tag;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(tag);
      return acc;
    }, {});
  };

  const groupedTags = groupTags(tags);

  const formatCategoryName = (category: string) => {
    if (category === "SPECIAL_FEATURE") return "SPECIAL FEATURE";
    return category.replace(/_/g, " ");
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 sm:p-6 md:p-8">
      {Object.keys(groupedTags).map((category) => (
        <div key={category} className="mb-8">
          <h3 className="font-bold text-2xl text-gray-800 mb-4 border-b pb-2">
            {formatCategoryName(category)}
          </h3>
          <div className="flex flex-wrap gap-3">
            {groupedTags[category].map((tag: any) => (
              <div key={tag.id} className="cursor-pointer">
                <Tag
                  emoji={tag.tag.emoji}
                  name={tag.tag.name}
                  votes={tag.votes}
                  userVoted={tag.userVoted}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantTags;

"use client";

import React, { useEffect, useState } from 'react';

type Props = {
  selectedMeal: string;
};

const Sidebar = ({ selectedMeal }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mealData, setMealData] = useState<any>({});

  useEffect(() => {
    const fetchMealData = async () => {
      if (selectedMeal) {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedMeal}`
          );
          const data = await response.json();

          if (data.meals && data.meals.length > 0) {
            setMealData(data.meals[0]);  // Assuming the first meal in the response is the desired one
          } else {
            console.error("No meal found with the name:", selectedMeal);
          }
        } catch (error) {
          console.error("Error fetching meal data:", error);
        }
      }
    };

    fetchMealData();
  }, [selectedMeal]);



  return (
    <div className="p-4 bg-white shadow-lg border-l border-gray-200 overflow-y-auto h-full flex-1">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[20px] font-[400] text-gray-500 ">{mealData?.strMeal}</p>
      </div>
      <img
        src={mealData?.strMealThumb}
        alt={mealData?.strMeal}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {mealData?.strTags && mealData?.strTags.split(",").map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-gray-200 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="space-y-2 text-[12px] text-gray-400 grid ">
        <div className='flex justify-start gap-[50px] '>
          <p>
          Category:
          </p>
          <p className='text-[14px] text-gray-600'>
          {mealData?.strCategory}
          </p>
          
        </div>
        <div className='flex justify-start gap-[76px]'>
          <p>
          Area:
          </p>
          <p className='text-[14px] text-gray-600'>
          {mealData?.strArea}
          </p>
          
        </div>
        <div className='flex justify-start gap-14 '>
          <p>
          YouTube:{' '}
          </p>
          <p className='text-[14px] text-gray-600'>
          {mealData?.strYoutube ? 
            <a href={mealData?.strYoutube} target="_blank" rel="noopener noreferrer" className="text-black underline">
            {mealData?.strYoutube}
          </a> : "No link availabe"}
          </p>
        </div>
        <div className='flex justify-start gap-16'>
          <p>
          Recipe:{' '}
          </p>
          <p className='text-[14px] text-gray-600'>
          <a href={mealData?.strSource} target="_blank" rel="noopener noreferrer" className="text-black underline">
            {mealData?.strSource}
          </a>
          </p>
        </div>
      </div>
      <div className="mt-4 border-[1px] p-[5px] border-black">
        <h3 className="font-semibold mb-2">Instructions</h3>
        <p className="text-sm">{mealData?.strInstructions}</p>
      </div>
    </div>
  );
};

export default Sidebar;

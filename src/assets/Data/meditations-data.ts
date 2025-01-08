export interface MeditationsProps {
  id: number;
  title: string;
  description: string;
  music: string;
}

interface MeditationsData {
  meditations: MeditationsProps[];
}

export const data: MeditationsData = {
  meditations: [
    {
      id: 1,
      title: 'Golden Sunrise Meditation',
      description:
        '“Close your eyes and imagine the first rays of the sun gently touching your skin. Feel the warmth spreading through your body. With each breath, let go of any tension, and allow the golden light to fill you with calm and clarity.”',
      music: require('../../../android/app/src/main/res/raw/goldensunrisemeditation.wav'),
    },
    {
      id: 2,
      title: 'Mercury’s Calm Flow',
      description:
        '“Visualize yourself in the flow of a calm river, the water moving smoothly, like the steady orbit of Mercury. Let your thoughts drift away like leaves on the water. With every breath, feel more at peace and more connected to the present moment.”',
      music: '../../../android/app/src/main/res/raw/mercuryscalmflow.wav',
    },
    {
      id: 3,
      title: 'Cosmic Stillness',
      description:
        '“Picture yourself floating in space, surrounded by stars. The vast stillness calms your mind, and the deep silence brings peace to your heart. Focus on your breath, feeling the rhythm of the universe as it guides you to serenity.”',
      music: '../../../android/app/src/main/res/raw/cosmicstillness.wav',
    },
    {
      id: 4,
      title: 'Sunlight Energy Boost',
      description:
        '“Imagine standing in the heart of the sun’s rays, feeling the vibrant energy fill you with strength and positivity. Each breath fuels you with light, giving you the power to take on the day with confidence. Let the sunlight energize your body and mind.”',
      music: '../../../android/app/src/main/res/raw/sunlightenergyboost.wav',
    },
    {
      id: 5,
      title: 'Moonlight Reflection',
      description:
        '“Breathe deeply and imagine the soft light of the moon shining down on you. Feel its cool glow wash over your body, bringing clarity and introspection. With each breath, let the moon’s reflection guide you to a place of inner peace and understanding.”',
      music: '../../../android/app/src/main/res/raw/music/moonlightreflection.wav',
    },
  ]
 };

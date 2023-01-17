<?php


// Array of emojis
$emojis = [ "🥹", "😅", "🥲", "😊", "😇", "🙃", "😍", "🥰", "😘", "🤓", "😎", "🥸", "🤩", "🥳", "😞", "🥺", "😢", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "🤗", "🫣",  "🤫", "🫠", "🤥", "😶", "🫥", "🙄",  "😴", "🤤","😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤕", "🤠", "🤡", "👽", "🎃", "💀", "👌", "👁", "🧠", "🧶", "💍", "🐙", "🌳", "🌸", "🌞", "🌝", "🌚", "🌍", "🍏", "🍑", "🍅", "🫒", "🍔", "🍤", "🍩", "🍪", "⚽️", "⚾️", "🏀", "🎾", "🎱", "🏵", "💿", "⏱", "⏰", "🪙", "⚙️", "🪩", "💝", "⭕️", "🚫", "🔞", "🚯", "🌐", "🌀", "🕐", ];

// Generate a random signature with 3 emojis
for ($i = 0; $i < 1; $i++) {
  $signature = "<html><body><h1 style='font-family: Helvetica; display: inline; font-size: 3em'>GIN</h1><span style='display: inline; font-size: 2.6em; margin-left: -0.05em; vertical-align: top'>" . $emojis[array_rand($emojis)] . "</span><h1 style='font-family: Helvetica; display: inline; font-size: 3em; margin-left: -0.05em;'>.</h1> ";
}
$signature .= "<p style='line-height: 20%;font-family: Helvetica; text-decoration: none; color: black'>Selma Mandoudi</p>
      <p style='font-family: Helvetica; text-decoration: none; color: black; line-height: 90%'>
        +41 76 298 11 73 <br />
        <a
          style='font-family: Helvetica; text-decoration: none !important; color: black !important'
          href='mailto:booking.gino@lorisbriguet.ch'
          target='_blank'
        >
          booking.gino@lorisbriguet.ch
        </a>
      </p></body></html>";

echo $signature;
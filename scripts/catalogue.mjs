/**
 * Demo catalogue: public-domain classics with their real opening lines, used
 * by scripts/make-covers.mjs (covers and preview pages) and scripts/seed.mjs.
 * Sample data only: these are not the publisher's own titles.
 */
export const BOOKS = [
  { slug: "pride-and-prejudice", title: "Pride and Prejudice", author: "Jane Austen", year: 1813, category: "New Arrival", price: 12, pages: 432, quantity: 24, palette: ["#2f3e46", "#cad2c5"],
    description: "Elizabeth Bennet meets the proud Mr Darcy, and first impressions turn out to be the hardest to change.",
    opening: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters." },
  { slug: "jane-eyre", title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, category: "New Arrival", price: 13, pages: 532, quantity: 18, palette: ["#3d2c2e", "#e8d5b7"],
    description: "An orphaned governess finds her own voice, and refuses to give it up, at Thornfield Hall.",
    opening: "There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question." },
  { slug: "great-expectations", title: "Great Expectations", author: "Charles Dickens", year: 1861, category: "New Arrival", price: 14, pages: 544, quantity: 15, palette: ["#1b3a4b", "#f4d58d"],
    description: "Pip, a village orphan, is lifted into a gentleman's life by a mysterious benefactor.",
    opening: "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip." },
  { slug: "alices-adventures-in-wonderland", title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", year: 1865, category: "Children and Youth", price: 9, pages: 192, quantity: 30, palette: ["#5b2a86", "#f7c6e0"],
    description: "Alice follows a White Rabbit down a hole into a world where nothing behaves as it should.",
    opening: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, \"and what is the use of a book,\" thought Alice \"without pictures or conversations?\"" },
  { slug: "little-women", title: "Little Women", author: "Louisa May Alcott", year: 1868, category: "Children and Youth", price: 11, pages: 480, quantity: 21, palette: ["#7a3b2e", "#f6e7cb"],
    description: "Four sisters grow up through hard winters, small fortunes and big ambitions.",
    opening: "\"Christmas won't be Christmas without any presents,\" grumbled Jo, lying on the rug. \"It's so dreadful to be poor!\" sighed Meg, looking down at her old dress. \"I don't think it's fair for some girls to have plenty of pretty things, and other girls nothing at all,\" added little Amy, with an injured sniff." },
  { slug: "treasure-island", title: "Treasure Island", author: "Robert Louis Stevenson", year: 1883, category: "Children and Youth", price: 10, pages: 304, quantity: 12, palette: ["#0b3954", "#fdd692"],
    description: "Young Jim Hawkins sails for buried treasure, with Long John Silver aboard.",
    opening: "Squire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17—, and go back to the time when my father kept the Admiral Benbow inn." },
  { slug: "the-secret-garden", title: "The Secret Garden", author: "Frances Hodgson Burnett", year: 1911, category: "Children and Youth", price: 10, pages: 288, quantity: 3, palette: ["#2d6a4f", "#d8f3dc"],
    description: "A lonely girl finds a locked, forgotten garden, and brings it, and herself, back to life.",
    opening: "When Mary Lennox was sent to Misselthwaite Manor to live with her uncle everybody said she was the most disagreeable-looking child ever seen. It was true, too." },
  { slug: "a-tale-of-two-cities", title: "A Tale of Two Cities", author: "Charles Dickens", year: 1859, category: "History", price: 13, pages: 448, quantity: 9, palette: ["#6a040f", "#ffe8d6"],
    description: "London and Paris on the eve of revolution, and the lives caught between them.",
    opening: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair." },
  { slug: "autobiography-of-benjamin-franklin", title: "The Autobiography of Benjamin Franklin", author: "Benjamin Franklin", year: 1791, category: "History", price: 11, pages: 256, quantity: 7, palette: ["#283618", "#fefae0"],
    description: "A printer's apprentice tells how he became a writer, scientist and statesman.",
    opening: "Dear Son: I have ever had pleasure in obtaining any little anecdotes of my ancestors. You may remember the inquiries I made among the remains of my relations when you were with me in England, and the journey I undertook for that purpose." },
  { slug: "the-elements-of-style", title: "The Elements of Style", author: "William Strunk Jr.", year: 1918, category: "Introductory Books", price: 8, pages: 96, quantity: 40, palette: ["#14213d", "#fca311"],
    description: "The short classic on writing plainly: rules of usage, composition and form.",
    opening: "This book is intended for use in English courses in which the practice of composition is combined with the study of literature. It aims to give in brief space the principal requirements of plain English style." },
  { slug: "walden", title: "Walden", author: "Henry David Thoreau", year: 1854, category: "Introductory Books", price: 12, pages: 352, quantity: 11, palette: ["#344e41", "#dad7cd"],
    description: "Two years in a cabin by a pond, and what living simply taught him.",
    opening: "When I wrote the following pages, or rather the bulk of them, I lived alone, in the woods, a mile from any neighbor, in a house which I had built myself, on the shore of Walden Pond, in Concord, Massachusetts, and earned my living by the labor of my hands only." },
  { slug: "moby-dick", title: "Moby-Dick", author: "Herman Melville", year: 1851, category: "Coming Soon", price: 16, pages: 720, quantity: 0, palette: ["#03045e", "#caf0f8"],
    description: "Captain Ahab's hunt for the white whale, told by the sailor who survived it.",
    opening: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world." },
  { slug: "frankenstein", title: "Frankenstein", author: "Mary Shelley", year: 1818, category: "Coming Soon", price: 11, pages: 280, quantity: 0, palette: ["#212529", "#adb5bd"],
    description: "A young scientist gives life to a creature, and cannot escape what he has made.",
    opening: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking." },
];

export const CATEGORIES = ["Coming Soon", "New Arrival", "Children and Youth", "Sacred Writings", "Devotions", "History", "Introductory Books"];

/** Sample orders: [name, city, country, book slug, quantity, format, payment, status, days ago] */
export const ORDERS = [
  ["Ayesha Khan", "Rawalpindi", "Pakistan", "pride-and-prejudice", 2, "Hard copy", "cash_on_delivery", "delivered", 18],
  ["Bilal Ahmed", "Lahore", "Pakistan", "the-elements-of-style", 1, "E-book", "bank_transfer", "delivered", 15],
  ["Sara Malik", "Islamabad", "Pakistan", "little-women", 1, "Hard copy", "cash_on_delivery", "shipped", 6],
  ["Omar Farooq", "Karachi", "Pakistan", "treasure-island", 3, "Hard copy", "bank_transfer", "shipped", 5],
  ["Hina Raza", "Peshawar", "Pakistan", "jane-eyre", 1, "E-book", "card", "delivered", 12],
  ["Daniel Brooks", "Manchester", "United Kingdom", "great-expectations", 1, "Hard copy", "card", "processing", 2],
  ["Fatima Noor", "Rawalpindi", "Pakistan", "the-secret-garden", 2, "Hard copy", "cash_on_delivery", "processing", 1],
  ["Usman Tariq", "Multan", "Pakistan", "walden", 1, "E-book", "card", "delivered", 9],
  ["Mariam Iqbal", "Faisalabad", "Pakistan", "alices-adventures-in-wonderland", 2, "Hard copy", "cash_on_delivery", "pending", 0],
  ["Ali Hassan", "Islamabad", "Pakistan", "a-tale-of-two-cities", 1, "Hard copy", "bank_transfer", "pending", 0],
];

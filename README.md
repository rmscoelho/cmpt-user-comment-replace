# cmpt-user-comment-replace
Replace CMPortugal certain users' commentaries with random facts

## Instructions
1. Set the browser to developer mode (if applicable);
2. Install TamperMonkey extension from Extensions store;
3. Add new script;
4. Open "comment-replace.js" in GitHub;
5. Click on "Raw";
6. Copy all content;
7. Paste in TamperMonkey's script editor;
8. Save (CTRL+S);
9. Done!

### To add more users to block list
1. Edit script in TamperMonkey;
2. In the variable ```const userList = ['Sima01'] ``` inside the brackets add ```,'userName'``` for each user you pretend to block.
3. Save (CTRL+S);
4. Done!

### Change the replacement content
1. Edit script in TamperMonkey;
2. In the variable ```const quoteType = 'facts' ``` inside the brackets change the value to any of the following ```facts/aleixo/renato/senhorPe/beatriz/inspirational/jokes/biblia/memes/capybaraFacts/capybaraImages```;
3. Save (CTRL+S);
4. Done!

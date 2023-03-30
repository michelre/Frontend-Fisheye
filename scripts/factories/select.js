function Select(data) {



	function getSelectDOM() {

        /*
        <div role="listbox" tabindex="0" id="listbox1" onclick="return listItemClick(event);"
  onkeydown="return listItemKeyEvent(event);" onkeypress="return listItemKeyEvent(event);"
  onfocus="this.className='focus';" onblur="this.className='blur';" aria-activedescendant="listbox1-1">
  <div role="option" id="listbox1-1" class="selected">Vert</div>
  <div role="option" id="listbox1-2">Orange</div>
  <div role="option" id="listbox1-3">Rouge</div>
  <div role="option" id="listbox1-4">Bleu</div>
  <div role="option" id="listbox1-5">Violet</div>
  <div role="option" id="listbox1-6">Pervenche</div>
</div>
         */

        const listbox = document.createElement('div')
        listbox.innerText = 'Listbox'

		return listbox;
	}

	return { getSelectDOM };
}


# theyogabook.com
<!DOCTYPE html>

<html dir="ltr" lang="en">

<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<meta name="google" value="notranslate">

<script>
function addRow(name, url, isdir,
    size, size_string, date_modified, date_modified_string) {
  if (name == "." || name == "..")
    return;

  var root = document.location.pathname;
  if (root.substr(-1) !== "/")
    root += "/";

  var tbody = document.getElementById("tbody");
  var row = document.createElement("tr");
  var file_cell = document.createElement("td");
  var link = document.createElement("a");

  link.className = isdir ? "icon dir" : "icon file";

  if (isdir) {
    name = name + "/";
    url = url + "/";
    size = 0;
    size_string = "";
  } else {
    link.draggable = "true";
    link.addEventListener("dragstart", onDragStart, false);
  }
  link.innerText = name;
  link.href = root + url;

  file_cell.dataset.value = name;
  file_cell.appendChild(link);

  row.appendChild(file_cell);
  row.appendChild(createCell(size, size_string));
  row.appendChild(createCell(date_modified, date_modified_string));

  tbody.appendChild(row);
}

function onDragStart(e) {
  var el = e.srcElement;
  var name = el.innerText.replace(":", "");
  var download_url_data = "application/octet-stream:" + name + ":" + el.href;
  e.dataTransfer.setData("DownloadURL", download_url_data);
  e.dataTransfer.effectAllowed = "copy";
}

function createCell(value, text) {
  var cell = document.createElement("td");
  cell.setAttribute("class", "detailsColumn");
  cell.dataset.value = value;
  cell.innerText = text;
  return cell;
}

function start(location) {
  var header = document.getElementById("header");
  header.innerText = header.innerText.replace("LOCATION", location);

  document.getElementById("title").innerText = header.innerText;
}

function onHasParentDirectory() {
  var box = document.getElementById("parentDirLinkBox");
  box.style.display = "block";

  var root = document.location.pathname;
  if (!root.endsWith("/"))
    root += "/";

  var link = document.getElementById("parentDirLink");
  link.href = root + "..";
}

function sortTable(column) {
  var theader = document.getElementById("theader");
  var oldOrder = theader.cells[column].dataset.order || '1';
  oldOrder = parseInt(oldOrder, 10)
  var newOrder = 0 - oldOrder;
  theader.cells[column].dataset.order = newOrder;

  var tbody = document.getElementById("tbody");
  var rows = tbody.rows;
  var list = [], i;
  for (i = 0; i < rows.length; i++) {
    list.push(rows[i]);
  }

  list.sort(function(row1, row2) {
    var a = row1.cells[column].dataset.value;
    var b = row2.cells[column].dataset.value;
    if (column) {
      a = parseInt(a, 10);
      b = parseInt(b, 10);
      return a > b ? newOrder : a < b ? oldOrder : 0;
    }

    // Column 0 is text.
    if (a > b)
      return newOrder;
    if (a < b)
      return oldOrder;
    return 0;
  });

  // Appending an existing child again just moves it.
  for (i = 0; i < list.length; i++) {
    tbody.appendChild(list[i]);
  }
}

// Add event handlers to column headers.
function addHandlers(element, column) {
  element.onclick = (e) => sortTable(column);
  element.onkeydown = (e) => {
    if (e.key == 'Enter' || e.key == ' ') {
      sortTable(column);
      e.preventDefault();
    }
  };
}

function onLoad() {
  addHandlers(document.getElementById('nameColumnHeader'), 0);
  addHandlers(document.getElementById('sizeColumnHeader'), 1);
  addHandlers(document.getElementById('dateColumnHeader'), 2);
}

window.addEventListener('DOMContentLoaded', onLoad);
</script>

<style>

  h1 {
    border-bottom: 1px solid #c0c0c0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
  }

  table {
    border-collapse: collapse;
  }

  th {
    cursor: pointer;
  }

  td.detailsColumn {
    padding-inline-start: 2em;
    text-align: end;
    white-space: nowrap;
  }

  a.icon {
    padding-inline-start: 1.5em;
    text-decoration: none;
    user-select: auto;
  }

  a.icon:hover {
    text-decoration: underline;
  }

  a.file {
    background : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABEElEQVR42nRRx3HDMBC846AHZ7sP54BmWAyrsP588qnwlhqw/k4v5ZwWxM1hzmGRgV1cYqrRarXoH2w2m6qqiqKIR6cPtzc3xMSML2Te7XZZlnW7Pe/91/dX47WRBHuA9oyGmRknzGDjab1ePzw8bLfb6WRalmW4ip9FDVpYSWZgOp12Oh3nXJ7nxoJSGEciteP9y+fH52q1euv38WosqA6T2gGOT44vry7BEQtJkMAMMpa6JagAMcUfWYa4hkkzAc7fFlSjwqCoOUYAF5RjHZPVCFBOtSBGfgUDji3c3jpibeEMQhIMh8NwshqyRsBJgvF4jMs/YlVR5KhgNpuBLzk0OcUiR3CMhcPaOzsZiAAA/AjmaB3WZIkAAAAASUVORK5CYII=") left top no-repeat;
  }

  a.dir {
    background : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVR42oxStZoWQRCs2cXdHTLcHZ6EjAwnQWIkJyQlRt4Cd3d3d1n5d7q7ju1zv/q+mh6taQsk8fn29kPDRo87SDMQcNAUJgIQkBjdAoRKdXjm2mOH0AqS+PlkP8sfp0h93iu/PDji9s2FzSSJVg5ykZqWgfGRr9rAAAQiDFoB1OfyESZEB7iAI0lHwLREQBcQQKqo8p+gNUCguwCNAAUQAcFOb0NNGjT+BbUC2YsHZpWLhC6/m0chqIoM1LKbQIIBwlTQE1xAo9QDGDPYf6rkTpPc92gCUYVJAZjhyZltJ95f3zuvLYRGWWCUNkDL2333McBh4kaLlxg+aTmyL7c2xTjkN4Bt7oE3DBP/3SRz65R/bkmBRPGzcRNHYuzMjaj+fdnaFoJUEdTSXfaHbe7XNnMPyqryPcmfY+zURaAB7SHk9cXSH4fQ5rojgCAVIuqCNWgRhLYLhJB4k3iZfIPtnQiCpjAzeBIRXMA6emAqoEbQSoDdGxFUrxS1AYcpaNbBgyQBGJEOnYOeENKR/iAd1npusI4C75/c3539+nbUjOgZV5CkAU27df40lH+agUdIuA/EAgDmZnwZlhDc0wAAAABJRU5ErkJggg==") left top no-repeat;
  }

  a.up {
    background : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR42myTA+w1RxRHz+zftmrbdlTbtq04qRGrCmvbDWp9tq3a7tPcub8mj9XZ3eHOGQdJAHw77/LbZuvnWy+c/CIAd+91CMf3bo+bgcBiBAGIZKXb19/zodsAkFT+3px+ssYfyHTQW5tr05dCOf3xN49KaVX9+2zy1dX4XMk+5JflN5MBPL30oVsvnvEyp+18Nt3ZAErQMSFOfelCFvw0HcUloDayljZkX+MmamTAMTe+d+ltZ+1wEaRAX/MAnkJdcujzZyErIiVSzCEvIiq4O83AG7LAkwsfIgAnbncag82jfPPdd9RQyhPkpNJvKJWQBKlYFmQA315n4YPNjwMAZYy0TgAweedLmLzTJSTLIxkWDaVCVfAbbiKjytgmm+EGpMBYW0WwwbZ7lL8anox/UxekaOW544HO0ANAshxuORT/RG5YSrjlwZ3lM955tlQqbtVMlWIhjwzkAVFB8Q9EAAA3AFJ+DR3DO/Pnd3NPi7H117rAzWjpEs8vfIqsGZpaweOfEAAFJKuM0v6kf2iC5pZ9+fmLSZfWBVaKfLLNOXj6lYY0V2lfyVCIsVzmcRV9Y0fx02eTaEwhl2PDrXcjFdYRAohQmS8QEFLCLKGYA0AeEakhCCFDXqxsE0AQACgAQp5w96o0lAXuNASeDKWIvADiHwigfBINpWKtAXJvCEKWgSJNbRvxf4SmrnKDpvZavePu1K/zu/due1X/6Nj90MBd/J2Cic7WjBp/jUdIuA8AUtd65M+PzXIAAAAASUVORK5CYII=") left top no-repeat;
  }

  html[dir=rtl] a {
    background-position-x: right;
  }

  #parentDirLinkBox {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
</style>

<title id="title"></title>

</head>

<body>

<h1 id="header">Index of LOCATION</h1>

<div id="parentDirLinkBox" style="display:none">
  <a id="parentDirLink" class="icon up">
    <span id="parentDirText">[parent directory]</span>
  </a>
</div>

<table>
  <thead>
    <tr class="header" id="theader">
      <th id="nameColumnHeader" tabindex=0 role="button">Name</th>
      <th id="sizeColumnHeader" class="detailsColumn" tabindex=0 role="button">
        Size
      </th>
      <th id="dateColumnHeader" class="detailsColumn" tabindex=0 role="button">
        Date Modified
      </th>
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
</table>

</body>

</html>
<script>// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview This file defines a singleton which provides access to all data
 * that is available as soon as the page's resources are loaded (before DOM
 * content has finished loading). This data includes both localized strings and
 * any data that is important to have ready from a very early stage (e.g. things
 * that must be displayed right away).
 *
 * Note that loadTimeData is not guaranteed to be consistent between page
 * refreshes (https://crbug.com/740629) and should not contain values that might
 * change if the page is re-opened later.
 */

/** @type {!LoadTimeData} */
// eslint-disable-next-line no-var
var loadTimeData;

class LoadTimeData {
  constructor() {
    /** @type {?Object} */
    this.data_ = null;
  }

  /**
   * Sets the backing object.
   *
   * Note that there is no getter for |data_| to discourage abuse of the form:
   *
   *     var value = loadTimeData.data()['key'];
   *
   * @param {Object} value The de-serialized page data.
   */
  set data(value) {
    expect(!this.data_, 'Re-setting data.');
    this.data_ = value;
  }

  /**
   * @param {string} id An ID of a value that might exist.
   * @return {boolean} True if |id| is a key in the dictionary.
   */
  valueExists(id) {
    return id in this.data_;
  }

  /**
   * Fetches a value, expecting that it exists.
   * @param {string} id The key that identifies the desired value.
   * @return {*} The corresponding value.
   */
  getValue(id) {
    expect(this.data_, 'No data. Did you remember to include strings.js?');
    const value = this.data_[id];
    expect(typeof value !== 'undefined', 'Could not find value for ' + id);
    return value;
  }

  /**
   * As above, but also makes sure that the value is a string.
   * @param {string} id The key that identifies the desired string.
   * @return {string} The corresponding string value.
   */
  getString(id) {
    const value = this.getValue(id);
    expectIsType(id, value, 'string');
    return /** @type {string} */ (value);
  }

  /**
   * Returns a formatted localized string where $1 to $9 are replaced by the
   * second to the tenth argument.
   * @param {string} id The ID of the string we want.
   * @param {...(string|number)} var_args The extra values to include in the
   *     formatted output.
   * @return {string} The formatted string.
   */
  getStringF(id, var_args) {
    const value = this.getString(id);
    if (!value) {
      return '';
    }

    const args = Array.prototype.slice.call(arguments);
    args[0] = value;
    return this.substituteString.apply(this, args);
  }

  /**
   * Returns a formatted localized string where $1 to $9 are replaced by the
   * second to the tenth argument. Any standalone $ signs must be escaped as
   * $$.
   * @param {string} label The label to substitute through.
   *     This is not an resource ID.
   * @param {...(string|number)} var_args The extra values to include in the
   *     formatted output.
   * @return {string} The formatted string.
   */
  substituteString(label, var_args) {
    const varArgs = arguments;
    return label.replace(/\$(.|$|\n)/g, function(m) {
      expect(m.match(/\$[$1-9]/), 'Unescaped $ found in localized string.');
      return m === '$$' ? '$' : varArgs[m[1]];
    });
  }

  /**
   * Returns a formatted string where $1 to $9 are replaced by the second to
   * tenth argument, split apart into a list of pieces describing how the
   * substitution was performed. Any standalone $ signs must be escaped as $$.
   * @param {string} label A localized string to substitute through.
   *     This is not an resource ID.
   * @param {...(string|number)} var_args The extra values to include in the
   *     formatted output.
   * @return {!Array<!{value: string, arg: (null|string)}>} The formatted
   *     string pieces.
   */
  getSubstitutedStringPieces(label, var_args) {
    const varArgs = arguments;
    // Split the string by separately matching all occurrences of $1-9 and of
    // non $1-9 pieces.
    const pieces = (label.match(/(\$[1-9])|(([^$]|\$([^1-9]|$))+)/g) ||
                    []).map(function(p) {
      // Pieces that are not $1-9 should be returned after replacing $$
      // with $.
      if (!p.match(/^\$[1-9]$/)) {
        expect(
            (p.match(/\$/g) || []).length % 2 === 0,
            'Unescaped $ found in localized string.');
        return {value: p.replace(/\$\$/g, '$'), arg: null};
      }

      // Otherwise, return the substitution value.
      return {value: varArgs[p[1]], arg: p};
    });

    return pieces;
  }

  /**
   * As above, but also makes sure that the value is a boolean.
   * @param {string} id The key that identifies the desired boolean.
   * @return {boolean} The corresponding boolean value.
   */
  getBoolean(id) {
    const value = this.getValue(id);
    expectIsType(id, value, 'boolean');
    return /** @type {boolean} */ (value);
  }

  /**
   * As above, but also makes sure that the value is an integer.
   * @param {string} id The key that identifies the desired number.
   * @return {number} The corresponding number value.
   */
  getInteger(id) {
    const value = this.getValue(id);
    expectIsType(id, value, 'number');
    expect(value === Math.floor(value), 'Number isn\'t integer: ' + value);
    return /** @type {number} */ (value);
  }

  /**
   * Override values in loadTimeData with the values found in |replacements|.
   * @param {Object} replacements The dictionary object of keys to replace.
   */
  overrideValues(replacements) {
    expect(
        typeof replacements === 'object',
        'Replacements must be a dictionary object.');
    for (const key in replacements) {
      this.data_[key] = replacements[key];
    }
  }

  /**
   * Reset loadTimeData's data. Should only be used in tests.
   * @param {?Object} newData The data to restore to, when null restores to
   *    unset state.
   */
  resetForTesting(newData = null) {
    this.data_ = newData;
  }

  /**
   * @return {boolean} Whether loadTimeData.data has been set.
   */
  isInitialized() {
    return this.data_ !== null;
  }
}

  /**
   * Checks condition, throws error message if expectation fails.
   * @param {*} condition The condition to check for truthiness.
   * @param {string} message The message to display if the check fails.
   */
  function expect(condition, message) {
    if (!condition) {
      throw new Error(
          'Unexpected condition on ' + document.location.href + ': ' + message);
    }
  }

  /**
   * Checks that the given value has the given type.
   * @param {string} id The id of the value (only used for error message).
   * @param {*} value The value to check the type on.
   * @param {string} type The type we expect |value| to be.
   */
  function expectIsType(id, value, type) {
    expect(
        typeof value === type, '[' + value + '] (' + id + ') is not a ' + type);
  }

  expect(!loadTimeData, 'should only include this file once');
  loadTimeData = new LoadTimeData();

  // Expose |loadTimeData| directly on |window|, since within a JS module the
  // scope is local and not all files have been updated to import the exported
  // |loadTimeData| explicitly.
  window.loadTimeData = loadTimeData;

  console.warn('crbug/1173575, non-JS module files deprecated.');</script><script>loadTimeData.data = {"header":"Index of LOCATION","headerDateModified":"Date Modified","headerName":"Name","headerSize":"Size","language":"en","parentDirText":"[parent directory]","textdirection":"ltr"};</script><script>start("C:\\Users\\user\\Desktop\\yogabook\\images\\");</script>
<script>onHasParentDirectory();</script>
<script>addRow("3 dotted icon.png","3%20dotted%20icon.png",0,8463,"8.3 kB",1653379222,"5/24/22, 1:00:22 AM");</script>
<script>addRow("abs workout.jpg","abs%20workout.jpg",0,41339,"40.4 kB",1653484498,"5/25/22, 6:14:58 AM");</script>
<script>addRow("accessibility.png","accessibility.png",0,12073,"11.8 kB",1653402810,"5/24/22, 7:33:30 AM");</script>
<script>addRow("ads.mp4","ads.mp4",0,3806752,"3.6 MB",1653362954,"5/23/22, 8:29:14 PM");</script>
<script>addRow("advanced.jpg","advanced.jpg",0,41663,"40.7 kB",1653458704,"5/24/22, 11:05:04 PM");</script>
<script>addRow("anti aging.jpg","anti%20aging.jpg",0,38645,"37.7 kB",1653484220,"5/25/22, 6:10:20 AM");</script>
<script>addRow("arms workout.jpg","arms%20workout.jpg",0,39694,"38.8 kB",1653484280,"5/25/22, 6:11:20 AM");</script>
<script>addRow("ashwasanchalasana left.jpg","ashwasanchalasana%20left.jpg",0,36536,"35.7 kB",1653458756,"5/24/22, 11:05:56 PM");</script>
<script>addRow("ashwasanchalasana right.jpg","ashwasanchalasana%20right.jpg",0,42299,"41.3 kB",1653458756,"5/24/22, 11:05:56 PM");</script>
<script>addRow("back workout.jpg","back%20workout.jpg",0,43026,"42.0 kB",1653484442,"5/25/22, 6:14:02 AM");</script>
<script>addRow("beginner.jpg","beginner.jpg",0,63003,"61.5 kB",1653458706,"5/24/22, 11:05:06 PM");</script>
<script>addRow("big toe.jpg","big%20toe.jpg",0,28843,"28.2 kB",1653458794,"5/24/22, 11:06:34 PM");</script>
<script>addRow("bird dog left.jpg","bird%20dog%20left.jpg",0,27917,"27.3 kB",1653458752,"5/24/22, 11:05:52 PM");</script>
<script>addRow("bird dog right.jpg","bird%20dog%20right.jpg",0,29778,"29.1 kB",1653458752,"5/24/22, 11:05:52 PM");</script>
<script>addRow("boat.jpg","boat.jpg",0,30312,"29.6 kB",1653458806,"5/24/22, 11:06:46 PM");</script>
<script>addRow("bow.jpg","bow.jpg",0,28733,"28.1 kB",1653458782,"5/24/22, 11:06:22 PM");</script>
<script>addRow("bridge.jpg","bridge.jpg",0,32117,"31.4 kB",1653458786,"5/24/22, 11:06:26 PM");</script>
<script>addRow("camel.jpg","camel.jpg",0,35464,"34.6 kB",1653458726,"5/24/22, 11:05:26 PM");</script>
<script>addRow("cat.jpg","cat.jpg",0,28555,"27.9 kB",1653458780,"5/24/22, 11:06:20 PM");</script>
<script>addRow("chair.jpg","chair.jpg",0,26800,"26.2 kB",1653458760,"5/24/22, 11:06:00 PM");</script>
<script>addRow("chest workout.jpg","chest%20workout.jpg",0,73153,"71.4 kB",1653484464,"5/25/22, 6:14:24 AM");</script>
<script>addRow("child.jpg","child.jpg",0,24645,"24.1 kB",1653458746,"5/24/22, 11:05:46 PM");</script>
<script>addRow("cobra.jpg","cobra.jpg",0,30928,"30.2 kB",1653458770,"5/24/22, 11:06:10 PM");</script>
<script>addRow("comment.png","comment.png",0,4390,"4.3 kB",1653378612,"5/24/22, 12:50:12 AM");</script>
<script>addRow("cow face.jpg","cow%20face.jpg",0,36775,"35.9 kB",1653458724,"5/24/22, 11:05:24 PM");</script>
<script>addRow("cow.jpg","cow.jpg",0,27477,"26.8 kB",1653458780,"5/24/22, 11:06:20 PM");</script>
<script>addRow("crescent lunge left.jpg","crescent%20lunge%20left.jpg",0,30434,"29.7 kB",1653458758,"5/24/22, 11:05:58 PM");</script>
<script>addRow("crescent lunge right.jpg","crescent%20lunge%20right.jpg",0,30352,"29.6 kB",1653458758,"5/24/22, 11:05:58 PM");</script>
<script>addRow("crow.jpg","crow.jpg",0,35345,"34.5 kB",1653458778,"5/24/22, 11:06:18 PM");</script>
<script>addRow("dolphin.jpg","dolphin.jpg",0,28475,"27.8 kB",1653458782,"5/24/22, 11:06:22 PM");</script>
<script>addRow("downward facing dog.jpg","downward%20facing%20dog.jpg",0,37529,"36.6 kB",1653458796,"5/24/22, 11:06:36 PM");</script>
<script>addRow("eagle.jpg","eagle.jpg",0,30277,"29.6 kB",1653458712,"5/24/22, 11:05:12 PM");</script>
<script>addRow("extended hand to toe left.jpg","extended%20hand%20to%20toe%20left.jpg",0,38992,"38.1 kB",1653458746,"5/24/22, 11:05:46 PM");</script>
<script>addRow("extended hand to toe right.jpg","extended%20hand%20to%20toe%20right.jpg",0,42371,"41.4 kB",1653458744,"5/24/22, 11:05:44 PM");</script>
<script>addRow("extended puppy.jpg","extended%20puppy.jpg",0,33803,"33.0 kB",1653458730,"5/24/22, 11:05:30 PM");</script>
<script>addRow("extended side angle left.jpg","extended%20side%20angle%20left.jpg",0,39980,"39.0 kB",1653458718,"5/24/22, 11:05:18 PM");</script>
<script>addRow("extended side angle right.jpg","extended%20side%20angle%20right.jpg",0,41418,"40.4 kB",1653458716,"5/24/22, 11:05:16 PM");</script>
<script>addRow("fall season.jpg","fall%20season.jpg",0,84300,"82.3 kB",1653484520,"5/25/22, 6:15:20 AM");</script>
<script>addRow("fat burner.jpg","fat%20burner.jpg",0,37501,"36.6 kB",1653484540,"5/25/22, 6:15:40 AM");</script>
<script>addRow("feathered peacock.jpg","feathered%20peacock.jpg",0,29267,"28.6 kB",1653458742,"5/24/22, 11:05:42 PM");</script>
<script>addRow("feedback.png","feedback.png",0,3508,"3.4 kB",1653402812,"5/24/22, 7:33:32 AM");</script>
<script>addRow("feelings.png","feelings.png",0,11116,"10.9 kB",1653375398,"5/23/22, 11:56:38 PM");</script>
<script>addRow("fight depression.jpg","fight%20depression.jpg",0,36584,"35.7 kB",1653484564,"5/25/22, 6:16:04 AM");</script>
<script>addRow("floor yoga.jpg","floor%20yoga.jpg",0,41232,"40.3 kB",1653484606,"5/25/22, 6:16:46 AM");</script>
<script>addRow("four limbed staff.jpg","four%20limbed%20staff.jpg",0,31164,"30.4 kB",1653458730,"5/24/22, 11:05:30 PM");</script>
<script>addRow("full plank.jpg","full%20plank.jpg",0,32640,"31.9 kB",1653458726,"5/24/22, 11:05:26 PM");</script>
<script>addRow("garland pose.jpg","garland%20pose.jpg",0,42424,"41.4 kB",1653458742,"5/24/22, 11:05:42 PM");</script>
<script>addRow("glowing skin.jpg","glowing%20skin.jpg",0,32474,"31.7 kB",1653484624,"5/25/22, 6:17:04 AM");</script>
<script>addRow("glutes butt workout.jpg","glutes%20butt%20workout.jpg",0,77117,"75.3 kB",1653484646,"5/25/22, 6:17:26 AM");</script>
<script>addRow("groups.png","groups.png",0,22496,"22.0 kB",1653228876,"5/22/22, 7:14:36 AM");</script>
<script>addRow("half boat.jpg","half%20boat.jpg",0,40072,"39.1 kB",1653458710,"5/24/22, 11:05:10 PM");</script>
<script>addRow("half forward bend.jpg","half%20forward%20bend.jpg",0,38921,"38.0 kB",1653458718,"5/24/22, 11:05:18 PM");</script>
<script>addRow("half stand.jpg","half%20stand.jpg",0,24945,"24.4 kB",1653458774,"5/24/22, 11:06:14 PM");</script>
<script>addRow("half wheel.jpg","half%20wheel.jpg",0,30320,"29.6 kB",1653458714,"5/24/22, 11:05:14 PM");</script>
<script>addRow("halfmoon left.jpg","halfmoon%20left.jpg",0,34722,"33.9 kB",1653458762,"5/24/22, 11:06:02 PM");</script>
<script>addRow("halfmoon right.jpg","halfmoon%20right.jpg",0,34388,"33.6 kB",1653458762,"5/24/22, 11:06:02 PM");</script>
<script>addRow("hanumanasana left.jpg","hanumanasana%20left.jpg",0,31183,"30.5 kB",1653458798,"5/24/22, 11:06:38 PM");</script>
<script>addRow("hanumanasana right.jpg","hanumanasana%20right.jpg",0,32406,"31.6 kB",1653458798,"5/24/22, 11:06:38 PM");</script>
<script>addRow("head to knee forward bend left.jpg","head%20to%20knee%20forward%20bend%20left.jpg",0,49814,"48.6 kB",1653458720,"5/24/22, 11:05:20 PM");</script>
<script>addRow("head to knee forward bend right.jpg","head%20to%20knee%20forward%20bend%20right.jpg",0,45965,"44.9 kB",1653458720,"5/24/22, 11:05:20 PM");</script>
<script>addRow("Health calculator.jpg","Health%20calculator.jpg",0,35128,"34.3 kB",1653228872,"5/22/22, 7:14:32 AM");</script>
<script>addRow("help.png","help.png",0,3474,"3.4 kB",1653402810,"5/24/22, 7:33:30 AM");</script>
<script>addRow("high lunge left.jpg","high%20lunge%20left.jpg",0,38041,"37.1 kB",1653458740,"5/24/22, 11:05:40 PM");</script>
<script>addRow("high lunge right.jpg","high%20lunge%20right.jpg",0,38950,"38.0 kB",1653458742,"5/24/22, 11:05:42 PM");</script>
<script>addRow("inbox.png","inbox.png",0,6547,"6.4 kB",1653200144,"5/21/22, 11:15:44 PM");</script>
<script>addRow("info.png","info.png",0,11533,"11.3 kB",1653228876,"5/22/22, 7:14:36 AM");</script>
<script>addRow("intermediate.jpg","intermediate.jpg",0,45611,"44.5 kB",1653458704,"5/24/22, 11:05:04 PM");</script>
<script>addRow("inverted locust.jpg","inverted%20locust.jpg",0,32027,"31.3 kB",1653458710,"5/24/22, 11:05:10 PM");</script>
<script>addRow("knee to chest left.jpg","knee%20to%20chest%20left.jpg",0,31624,"30.9 kB",1653458748,"5/24/22, 11:05:48 PM");</script>
<script>addRow("knee to chest right.jpg","knee%20to%20chest%20right.jpg",0,32861,"32.1 kB",1653458750,"5/24/22, 11:05:50 PM");</script>
<script>addRow("knees to chest.jpg","knees%20to%20chest.jpg",0,43028,"42.0 kB",1653458750,"5/24/22, 11:05:50 PM");</script>
<script>addRow("konasana.jpg","konasana.jpg",0,37390,"36.5 kB",1653458800,"5/24/22, 11:06:40 PM");</script>
<script>addRow("legs up the wall.jpg","legs%20up%20the%20wall.jpg",0,33832,"33.0 kB",1653458740,"5/24/22, 11:05:40 PM");</script>
<script>addRow("legs workout.jpg","legs%20workout.jpg",0,44458,"43.4 kB",1653484960,"5/25/22, 6:22:40 AM");</script>
<script>addRow("like-black.png","like-black.png",0,16025,"15.6 kB",1653398332,"5/24/22, 6:18:52 AM");</script>
<script>addRow("like.png","like.png",0,17592,"17.2 kB",1653378612,"5/24/22, 12:50:12 AM");</script>
<script>addRow("locust.jpg","locust.jpg",0,27538,"26.9 kB",1653458760,"5/24/22, 11:06:00 PM");</script>
<script>addRow("logout.png","logout.png",0,17870,"17.5 kB",1653402810,"5/24/22, 7:33:30 AM");</script>
<script>addRow("lord of dance righrt.jpg","lord%20of%20dance%20righrt.jpg",0,32951,"32.2 kB",1653458784,"5/24/22, 11:06:24 PM");</script>
<script>addRow("lord of dance right.jpg","lord%20of%20dance%20right.jpg",0,33995,"33.2 kB",1653458786,"5/24/22, 11:06:26 PM");</script>
<script>addRow("lord of the dance 2 left.jpg","lord%20of%20the%20dance%202%20left.jpg",0,44000,"43.0 kB",1653458738,"5/24/22, 11:05:38 PM");</script>
<script>addRow("lord of the dance 2 right.jpg","lord%20of%20the%20dance%202%20right.jpg",0,47652,"46.5 kB",1653458738,"5/24/22, 11:05:38 PM");</script>
<script>addRow("lotus.jpg","lotus.jpg",0,33935,"33.1 kB",1653458774,"5/24/22, 11:06:14 PM");</script>
<script>addRow("low lunge left.jpg","low%20lunge%20left.jpg",0,27214,"26.6 kB",1653458722,"5/24/22, 11:05:22 PM");</script>
<script>addRow("low lunge right.jpg","low%20lunge%20right.jpg",0,26687,"26.1 kB",1653458722,"5/24/22, 11:05:22 PM");</script>
<script>addRow("marichis left.jpg","marichis%20left.jpg",0,42983,"42.0 kB",1653458728,"5/24/22, 11:05:28 PM");</script>
<script>addRow("marichis right.jpg","marichis%20right.jpg",0,42038,"41.1 kB",1653458728,"5/24/22, 11:05:28 PM");</script>
<script>addRow("media.jpg","media.jpg",0,17564,"17.2 kB",1653228874,"5/22/22, 7:14:34 AM");</script>
<script>addRow("monkey.jpg","monkey.jpg",0,35673,"34.8 kB",1653458724,"5/24/22, 11:05:24 PM");</script>
<script>addRow("mountains.jpg","mountains.jpg",0,29286,"28.6 kB",1653458768,"5/24/22, 11:06:08 PM");</script>
<script>addRow("namaskar.jpg","namaskar.jpg",0,24995,"24.4 kB",1653458746,"5/24/22, 11:05:46 PM");</script>
<script>addRow("neck workout.jpg","neck%20workout.jpg",0,28756,"28.1 kB",1653484670,"5/25/22, 6:17:50 AM");</script>
<script>addRow("notification.png","notification.png",0,103408,"101 kB",1653200184,"5/21/22, 11:16:24 PM");</script>
<script>addRow("one legged pigeon left.jpg","one%20legged%20pigeon%20left.jpg",0,37719,"36.8 kB",1653458754,"5/24/22, 11:05:54 PM");</script>
<script>addRow("one legged pigeon right.jpg","one%20legged%20pigeon%20right.jpg",0,38252,"37.4 kB",1653458754,"5/24/22, 11:05:54 PM");</script>
<script>addRow("one legged side plank left.jpg","one%20legged%20side%20plank%20left.jpg",0,49024,"47.9 kB",1653458714,"5/24/22, 11:05:14 PM");</script>
<script>addRow("one legged side plank right.jpg","one%20legged%20side%20plank%20right.jpg",0,44536,"43.5 kB",1653458716,"5/24/22, 11:05:16 PM");</script>
<script>addRow("over 50+age.jpg","over%2050+age.jpg",0,54468,"53.2 kB",1653484690,"5/25/22, 6:18:10 AM");</script>
<script>addRow("photo.png","photo.png",0,16281,"15.9 kB",1653375400,"5/23/22, 11:56:40 PM");</script>
<script>addRow("plank.jpg","plank.jpg",0,23862,"23.3 kB",1653458778,"5/24/22, 11:06:18 PM");</script>
<script>addRow("plow.jpg","plow.jpg",0,27533,"26.9 kB",1653458784,"5/24/22, 11:06:24 PM");</script>
<script>addRow("post-2.jpeg","post-2.jpeg",0,57426,"56.1 kB",1653398336,"5/24/22, 6:18:56 AM");</script>
<script>addRow("post-3.jpeg","post-3.jpeg",0,25269,"24.7 kB",1653398334,"5/24/22, 6:18:54 AM");</script>
<script>addRow("post-4.jpeg","post-4.jpeg",0,26871,"26.2 kB",1653398334,"5/24/22, 6:18:54 AM");</script>
<script>addRow("pp-1.jpeg","pp-1.jpeg",0,29233,"28.5 kB",1653367660,"5/23/22, 9:47:40 PM");</script>
<script>addRow("pp-2.jpeg","pp-2.jpeg",0,32853,"32.1 kB",1653367660,"5/23/22, 9:47:40 PM");</script>
<script>addRow("pp-3.jpeg","pp-3.jpeg",0,25972,"25.4 kB",1653367658,"5/23/22, 9:47:38 PM");</script>
<script>addRow("pp-4.jpeg","pp-4.jpeg",0,34590,"33.8 kB",1653367658,"5/23/22, 9:47:38 PM");</script>
<script>addRow("quit smoke.jpg","quit%20smoke.jpg",0,30244,"29.5 kB",1653484714,"5/25/22, 6:18:34 AM");</script>
<script>addRow("revolved triangle left.jpg","revolved%20triangle%20left.jpg",0,38057,"37.2 kB",1653458708,"5/24/22, 11:05:08 PM");</script>
<script>addRow("revolved triangle right.jpg","revolved%20triangle%20right.jpg",0,39231,"38.3 kB",1653458708,"5/24/22, 11:05:08 PM");</script>
<script>addRow("s-1.jpg","s-1.jpg",0,13341,"13.0 kB",1653278292,"5/22/22, 8:58:12 PM");</script>
<script>addRow("s-2.png","s-2.png",0,3415,"3.3 kB",1653278298,"5/22/22, 8:58:18 PM");</script>
<script>addRow("s-3.jpeg","s-3.jpeg",0,10043,"9.8 kB",1653278298,"5/22/22, 8:58:18 PM");</script>
<script>addRow("s-4.jpg","s-4.jpg",0,27600,"27.0 kB",1653278294,"5/22/22, 8:58:14 PM");</script>
<script>addRow("s-5.jpeg","s-5.jpeg",0,8438,"8.2 kB",1653278296,"5/22/22, 8:58:16 PM");</script>
<script>addRow("s-6.jpg","s-6.jpg",0,51812,"50.6 kB",1653278294,"5/22/22, 8:58:14 PM");</script>
<script>addRow("s-7.jpg","s-7.jpg",0,87527,"85.5 kB",1653278296,"5/22/22, 8:58:16 PM");</script>
<script>addRow("savasana.jpg","savasana.jpg",0,24215,"23.6 kB",1653458748,"5/24/22, 11:05:48 PM");</script>
<script>addRow("search.png","search.png",0,3546,"3.5 kB",1653200134,"5/21/22, 11:15:34 PM");</script>
<script>addRow("seated forward bend.jpg","seated%20forward%20bend.jpg",0,37062,"36.2 kB",1653458774,"5/24/22, 11:06:14 PM");</script>
<script>addRow("seated left.jpg","seated%20left.jpg",0,40897,"39.9 kB",1653458768,"5/24/22, 11:06:08 PM");</script>
<script>addRow("seated right.jpg","seated%20right.jpg",0,44021,"43.0 kB",1653458770,"5/24/22, 11:06:10 PM");</script>
<script>addRow("seated yoga.jpg","seated%20yoga.jpg",0,56819,"55.5 kB",1653484732,"5/25/22, 6:18:52 AM");</script>
<script>addRow("settings.png","settings.png",0,12539,"12.2 kB",1653402812,"5/24/22, 7:33:32 AM");</script>
<script>addRow("share.png","share.png",0,6035,"5.9 kB",1653378612,"5/24/22, 12:50:12 AM");</script>
<script>addRow("shoulder stand.jpg","shoulder%20stand.jpg",0,25780,"25.2 kB",1653458732,"5/24/22, 11:05:32 PM");</script>
<script>addRow("shoulders workout.jpg","shoulders%20workout.jpg",0,53475,"52.2 kB",1653484756,"5/25/22, 6:19:16 AM");</script>
<script>addRow("siddhasana.jpg","siddhasana.jpg",0,42004,"41.0 kB",1653458804,"5/24/22, 11:06:44 PM");</script>
<script>addRow("side plank left.jpg","side%20plank%20left.jpg",0,38498,"37.6 kB",1653458732,"5/24/22, 11:05:32 PM");</script>
<script>addRow("side plank right.jpg","side%20plank%20right.jpg",0,37061,"36.2 kB",1653458734,"5/24/22, 11:05:34 PM");</script>
<script>addRow("spring season.jpg","spring%20season.jpg",0,99150,"96.8 kB",1653484776,"5/25/22, 6:19:36 AM");</script>
<script>addRow("staff.jpg","staff.jpg",0,28094,"27.4 kB",1653458736,"5/24/22, 11:05:36 PM");</script>
<script>addRow("standing forward bend.jpg","standing%20forward%20bend.jpg",0,36152,"35.3 kB",1653458776,"5/24/22, 11:06:16 PM");</script>
<script>addRow("standing yoga.jpg","standing%20yoga.jpg",0,38815,"37.9 kB",1653484794,"5/25/22, 6:19:54 AM");</script>
<script>addRow("status-1.jpeg","status-1.jpeg",0,23518,"23.0 kB",1653365422,"5/23/22, 9:10:22 PM");</script>
<script>addRow("status-2.jpeg","status-2.jpeg",0,30668,"29.9 kB",1653365420,"5/23/22, 9:10:20 PM");</script>
<script>addRow("status-3.jpeg","status-3.jpeg",0,23037,"22.5 kB",1653365420,"5/23/22, 9:10:20 PM");</script>
<script>addRow("status-4.jpeg","status-4.jpeg",0,25358,"24.8 kB",1653365418,"5/23/22, 9:10:18 PM");</script>
<script>addRow("stress relief.jpg","stress%20relief.jpg",0,42095,"41.1 kB",1653484810,"5/25/22, 6:20:10 AM");</script>
<script>addRow("sukhasana.jpg","sukhasana.jpg",0,40565,"39.6 kB",1653458804,"5/24/22, 11:06:44 PM");</script>
<script>addRow("summer season.jpg","summer%20season.jpg",0,53598,"52.3 kB",1653484828,"5/25/22, 6:20:28 AM");</script>
<script>addRow("sun salutation.jpg","sun%20salutation.jpg",0,34954,"34.1 kB",1653484846,"5/25/22, 6:20:46 AM");</script>
<script>addRow("supported hand stand.jpg","supported%20hand%20stand.jpg",0,30485,"29.8 kB",1653458736,"5/24/22, 11:05:36 PM");</script>
<script>addRow("three legged dog left.jpg","three%20legged%20dog%20left.jpg",0,32425,"31.7 kB",1653458792,"5/24/22, 11:06:32 PM");</script>
<script>addRow("three legged dog right.jpg","three%20legged%20dog%20right.jpg",0,36471,"35.6 kB",1653458794,"5/24/22, 11:06:34 PM");</script>
<script>addRow("transitional period.jpg","transitional%20period.jpg",0,27357,"26.7 kB",1653484864,"5/25/22, 6:21:04 AM");</script>
<script>addRow("tree left.jpg","tree%20left.jpg",0,30961,"30.2 kB",1653458772,"5/24/22, 11:06:12 PM");</script>
<script>addRow("tree right.jpg","tree%20right.jpg",0,30293,"29.6 kB",1653458772,"5/24/22, 11:06:12 PM");</script>
<script>addRow("triangle left.jpg","triangle%20left.jpg",0,33816,"33.0 kB",1653458764,"5/24/22, 11:06:04 PM");</script>
<script>addRow("triangle right.jpg","triangle%20right.jpg",0,32404,"31.6 kB",1653458766,"5/24/22, 11:06:06 PM");</script>
<script>addRow("upload.jpeg","upload.jpeg",0,10764,"10.5 kB",1653364240,"5/23/22, 8:50:40 PM");</script>
<script>addRow("upward facing dog.jpg","upward%20facing%20dog.jpg",0,33758,"33.0 kB",1653458796,"5/24/22, 11:06:36 PM");</script>
<script>addRow("upward plank.jpg","upward%20plank.jpg",0,28670,"28.0 kB",1653458776,"5/24/22, 11:06:16 PM");</script>
<script>addRow("ustrasana.jpg","ustrasana.jpg",0,36261,"35.4 kB",1653458800,"5/24/22, 11:06:40 PM");</script>
<script>addRow("vajrasana.jpg","vajrasana.jpg",0,34821,"34.0 kB",1653458712,"5/24/22, 11:05:12 PM");</script>
<script>addRow("video.png","video.png",0,2561,"2.5 kB",1653200136,"5/21/22, 11:15:36 PM");</script>
<script>addRow("videos.jpeg","videos.jpeg",0,33157,"32.4 kB",1653375402,"5/23/22, 11:56:42 PM");</script>
<script>addRow("warrior 1 left.jpg","warrior%201%20left.jpg",0,25906,"25.3 kB",1653458790,"5/24/22, 11:06:30 PM");</script>
<script>addRow("warrior 1 right.jpg","warrior%201%20right.jpg",0,25471,"24.9 kB",1653458792,"5/24/22, 11:06:32 PM");</script>
<script>addRow("warrior 2 left.jpg","warrior%202%20left.jpg",0,33301,"32.5 kB",1653458788,"5/24/22, 11:06:28 PM");</script>
<script>addRow("warrior 2 right.jpg","warrior%202%20right.jpg",0,33048,"32.3 kB",1653458790,"5/24/22, 11:06:30 PM");</script>
<script>addRow("warrior 3 left.jpg","warrior%203%20left.jpg",0,29153,"28.5 kB",1653458788,"5/24/22, 11:06:28 PM");</script>
<script>addRow("warrior 3 right.jpg","warrior%203%20right.jpg",0,29059,"28.4 kB",1653458788,"5/24/22, 11:06:28 PM");</script>
<script>addRow("weight loss.jpg","weight%20loss.jpg",0,56764,"55.4 kB",1653458702,"5/24/22, 11:05:02 PM");</script>
<script>addRow("wheel.jpg","wheel.jpg",0,38029,"37.1 kB",1653458734,"5/24/22, 11:05:34 PM");</script>
<script>addRow("who sits all day.jpg","who%20sits%20all%20day.jpg",0,49867,"48.7 kB",1653484884,"5/25/22, 6:21:24 AM");</script>
<script>addRow("winter season.jpg","winter%20season.jpg",0,59695,"58.3 kB",1653484902,"5/25/22, 6:21:42 AM");</script>
<script>addRow("yoga classes.png","yoga%20classes.png",0,38902,"38.0 kB",1653228874,"5/22/22, 7:14:34 AM");</script>
<script>addRow("yoga profile pic.png","yoga%20profile%20pic.png",0,7819,"7.6 kB",1653200130,"5/21/22, 11:15:30 PM");</script>
<script>addRow("yoga.jpeg","yoga.jpeg",0,3932,"3.8 kB",1653200132,"5/21/22, 11:15:32 PM");</script>

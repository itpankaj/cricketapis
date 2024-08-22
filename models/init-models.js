var DataTypes = require("sequelize").DataTypes;
var _ad_spaces = require("./ad_spaces");
var _audios = require("./audios");
var _categories = require("./categories");
var _ci_sessions = require("./ci_sessions");
var _comments = require("./comments");
var _contacts = require("./contacts");
var _files = require("./files");
var _followers = require("./followers");
var _fonts = require("./fonts");
var _gallery = require("./gallery");
var _gallery_albums = require("./gallery_albums");
var _gallery_categories = require("./gallery_categories");
var _general_settings = require("./general_settings");
var _images = require("./images");
var _language_translations = require("./language_translations");
var _languages = require("./languages");
var _pages = require("./pages");
var _payouts = require("./payouts");
var _poll_votes = require("./poll_votes");
var _polls = require("./polls");
var _post_audios = require("./post_audios");
var _post_files = require("./post_files");
var _post_gallery_items = require("./post_gallery_items");
var _post_images = require("./post_images");
var _post_pageviews_month = require("./post_pageviews_month");
var _post_poll_votes = require("./post_poll_votes");
var _post_sorted_list_items = require("./post_sorted_list_items");
var _posts = require("./posts");
var _quiz_answers = require("./quiz_answers");
var _quiz_images = require("./quiz_images");
var _quiz_questions = require("./quiz_questions");
var _quiz_results = require("./quiz_results");
var _reactions = require("./reactions");
var _reading_lists = require("./reading_lists");
var _roles_permissions = require("./roles_permissions");
var _routes = require("./routes");
var _rss_feeds = require("./rss_feeds");
var _settings = require("./settings");
var _subscribers = require("./subscribers");
var _tags = require("./tags");
var _themes = require("./themes");
var _user_payout_accounts = require("./user_payout_accounts");
var _users = require("./users");
var _videos = require("./videos");
var _widgets = require("./widgets");

function initModels(sequelize) {
  var ad_spaces = _ad_spaces(sequelize, DataTypes);
  var audios = _audios(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var ci_sessions = _ci_sessions(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var contacts = _contacts(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var followers = _followers(sequelize, DataTypes);
  var fonts = _fonts(sequelize, DataTypes);
  var gallery = _gallery(sequelize, DataTypes);
  var gallery_albums = _gallery_albums(sequelize, DataTypes);
  var gallery_categories = _gallery_categories(sequelize, DataTypes);
  var general_settings = _general_settings(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var language_translations = _language_translations(sequelize, DataTypes);
  var languages = _languages(sequelize, DataTypes);
  var pages = _pages(sequelize, DataTypes);
  var payouts = _payouts(sequelize, DataTypes);
  var poll_votes = _poll_votes(sequelize, DataTypes);
  var polls = _polls(sequelize, DataTypes);
  var post_audios = _post_audios(sequelize, DataTypes);
  var post_files = _post_files(sequelize, DataTypes);
  var post_gallery_items = _post_gallery_items(sequelize, DataTypes);
  var post_images = _post_images(sequelize, DataTypes);
  var post_pageviews_month = _post_pageviews_month(sequelize, DataTypes);
  var post_poll_votes = _post_poll_votes(sequelize, DataTypes);
  var post_sorted_list_items = _post_sorted_list_items(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var quiz_answers = _quiz_answers(sequelize, DataTypes);
  var quiz_images = _quiz_images(sequelize, DataTypes);
  var quiz_questions = _quiz_questions(sequelize, DataTypes);
  var quiz_results = _quiz_results(sequelize, DataTypes);
  var reactions = _reactions(sequelize, DataTypes);
  var reading_lists = _reading_lists(sequelize, DataTypes);
  var roles_permissions = _roles_permissions(sequelize, DataTypes);
  var routes = _routes(sequelize, DataTypes);
  var rss_feeds = _rss_feeds(sequelize, DataTypes);
  var settings = _settings(sequelize, DataTypes);
  var subscribers = _subscribers(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var themes = _themes(sequelize, DataTypes);
  var user_payout_accounts = _user_payout_accounts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var videos = _videos(sequelize, DataTypes);
  var widgets = _widgets(sequelize, DataTypes);


  return {
    ad_spaces,
    audios,
    categories,
    ci_sessions,
    comments,
    contacts,
    files,
    followers,
    fonts,
    gallery,
    gallery_albums,
    gallery_categories,
    general_settings,
    images,
    language_translations,
    languages,
    pages,
    payouts,
    poll_votes,
    polls,
    post_audios,
    post_files,
    post_gallery_items,
    post_images,
    post_pageviews_month,
    post_poll_votes,
    post_sorted_list_items,
    posts,
    quiz_answers,
    quiz_images,
    quiz_questions,
    quiz_results,
    reactions,
    reading_lists,
    roles_permissions,
    routes,
    rss_feeds,
    settings,
    subscribers,
    tags,
    themes,
    user_payout_accounts,
    users,
    videos,
    widgets,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
